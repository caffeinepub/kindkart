import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import List "mo:core/List";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";

actor {
  // Include Authorization System
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Include Blob Storage
  include MixinStorage();

  ///////////////////
  // Type Definitions
  ///////////////////
  public type ProductCategory = {
    #books;
    #electronics;
    #clothing;
    #furniture;
    #sports;
    #homeAppliances;
    #toys;
    #tools;
    #automotive;
    #beauty;
    #other;
  };

  public type ProductCondition = {
    #new;
    #likeNew;
    #good;
    #fair;
    #poor;
  };

  public type ProductListing = {
    id : Nat;
    title : Text;
    description : Text;
    category : ProductCategory;
    price : Nat;
    condition : ProductCondition;
    imageUrls : [Text];
    seller : Principal;
    timestamp : Time.Time;
  };

  public type ProductListingInput = {
    title : Text;
    description : Text;
    category : ProductCategory;
    price : Nat;
    condition : ProductCondition;
    imageFiles : [Storage.ExternalBlob];
  };

  public type ChatMessage = {
    sender : Principal;
    content : Text;
    timestamp : Time.Time;
  };

  public type PurchaseDetails = {
    buyer : Principal;
    productId : Nat;
    paymentId : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    role : Text; // "User", "NGO", "DeliveryPartner", "Admin"
  };

  // Chat system types
  type Conversation = {
    id : Nat;
    participants : [Principal];
    messages : List.List<ChatMessage>;
  };

  // Tracking types
  type Tracking = {
    id : Nat;
    buyer : Principal;
    seller : Principal;
    productId : Nat;
    status : Text;
  };

  public type TrackingCode = {
    #dispatchInitiated;
    #handling;
    #onTheWay;
    #delivered;
    #cancelled;
  };

  // State variables
  var nextListingId : Nat = 1;
  var nextChatId : Nat = 1;
  var nextTrackCodeId : Nat = 1;

  let products = Map.empty<Nat, ProductListing>();
  let conversations = Map.empty<Nat, Conversation>();
  let trackings = Map.empty<Nat, Tracking>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  module ProductListing {
    public func compare(a : ProductListing, b : ProductListing) : Order.Order {
      Text.compare(a.title, b.title);
    };
  };

  ///////////////////
  // User Profile Management
  ///////////////////
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  ///////////////////
  // Marketplace (Product Management)
  ///////////////////
  public shared ({ caller }) func createProductListing(listingInput : ProductListingInput) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create listings");
    };

    let newListing : ProductListing = {
      id = nextListingId;
      title = listingInput.title;
      description = listingInput.description;
      category = listingInput.category;
      price = listingInput.price;
      condition = listingInput.condition;
      imageUrls = [];
      seller = caller;
      timestamp = Time.now();
    };

    products.add(nextListingId, newListing);
    nextListingId += 1;
    newListing.id;
  };

  public query func getAllProducts() : async [ProductListing] {
    products.values().toArray().sort();
  };

  public query func getProductById(id : Nat) : async ?ProductListing {
    products.get(id);
  };

  public shared ({ caller }) func purchaseProduct(purchaseDetails : PurchaseDetails) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can purchase products");
    };

    if (caller != purchaseDetails.buyer) {
      Runtime.trap("Unauthorized: Buyer mismatch");
    };

    switch (products.get(purchaseDetails.productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        if (product.seller == caller) {
          Runtime.trap("Cannot purchase your own product");
        };
      };
    };
  };

  ///////////////////
  // Messaging System
  ///////////////////
  private func isParticipant(conversation : Conversation, user : Principal) : Bool {
    conversation.participants.find<Principal>(func(p) { p == user }) != null;
  };

  public shared ({ caller }) func sendMessage(recipient : Principal, content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can send messages");
    };

    let newMessage : ChatMessage = {
      sender = caller;
      content;
      timestamp = Time.now();
    };

    // Create a new conversation
    let newConversation : Conversation = {
      id = nextChatId;
      participants = [caller, recipient];
      messages = List.empty();
    };

    newConversation.messages.add(newMessage);
    conversations.add(nextChatId, newConversation);
    nextChatId += 1;
  };

  public query ({ caller }) func getMessages(conversationId : Nat) : async ?[ChatMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view messages");
    };

    switch (conversations.get(conversationId)) {
      case (null) { null };
      case (?conversation) {
        if (not isParticipant(conversation, caller)) {
          Runtime.trap("Unauthorized: Not a participant in this conversation");
        };
        ?conversation.messages.toArray();
      };
    };
  };

  ///////////////////
  // Tracking System
  ///////////////////
  public shared ({ caller }) func createTracking(buyer : Principal, productId : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create tracking");
    };

    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        if (product.seller != caller and buyer != caller) {
          Runtime.trap("Unauthorized: Only buyer or seller can create tracking");
        };

        let newTracking : Tracking = {
          id = nextTrackCodeId;
          buyer;
          seller = product.seller;
          productId;
          status = "dispatchInitiated";
        };

        trackings.add(nextTrackCodeId, newTracking);
        nextTrackCodeId += 1;
        newTracking.id;
      };
    };
  };

  public shared ({ caller }) func updateTracking(trackingId : Nat, status : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update tracking");
    };

    switch (trackings.get(trackingId)) {
      case (null) { Runtime.trap("Tracking not found") };
      case (?tracking) {
        // Only seller or admin can update tracking status
        if (tracking.seller != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only seller or admin can update tracking");
        };

        let updatedTracking : Tracking = {
          id = tracking.id;
          buyer = tracking.buyer;
          seller = tracking.seller;
          productId = tracking.productId;
          status;
        };

        trackings.add(trackingId, updatedTracking);
        status;
      };
    };
  };

  public query ({ caller }) func getTracking(trackingId : Nat) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view tracking");
    };

    switch (trackings.get(trackingId)) {
      case (null) { "Tracking not found" };
      case (?tracking) {
        // Only buyer, seller, or admin can view tracking
        if (tracking.buyer != caller and tracking.seller != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own tracking");
        };
        tracking.status;
      };
    };
  };
};
