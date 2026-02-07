import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { detectCategory, estimatePrice, generateDescription } from '../../utils/simulatedAi';
import { ProductCategory, ProductCondition } from '../../backend';
import { useKindKartData } from '../../state/KindKartDataContext';

export default function SellProductPage() {
  const navigate = useNavigate();
  const { addProduct } = useKindKartData();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>(ProductCategory.electronics);
  const [condition, setCondition] = useState<ProductCondition>(ProductCondition.good);
  const [age, setAge] = useState(1);
  const [description, setDescription] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0, suggested: 0 });
  const [price, setPrice] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleDetectCategory = async () => {
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }
    setLoading(true);
    try {
      const detected = await detectCategory(images);
      setCategory(detected);
      toast.success('Category detected successfully!');
    } catch (error) {
      toast.error('Failed to detect category');
    } finally {
      setLoading(false);
    }
  };

  const handleEstimatePrice = async () => {
    setLoading(true);
    try {
      const estimate = await estimatePrice(category, condition, age);
      setPriceRange(estimate);
      setPrice(estimate.suggested);
      toast.success('Price estimated successfully!');
    } catch (error) {
      toast.error('Failed to estimate price');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDescription = async () => {
    if (!title) {
      toast.error('Please enter a title first');
      return;
    }
    setLoading(true);
    try {
      const generated = await generateDescription(category, condition, title);
      setDescription(generated);
      toast.success('Description generated!');
    } catch (error) {
      toast.error('Failed to generate description');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || price === 0) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const listingId = Date.now().toString();
      const newProduct = {
        id: BigInt(listingId),
        title,
        description,
        category,
        price: BigInt(price),
        condition,
        imageUrls: [],
        seller: { toText: () => 'current-user' } as any,
        timestamp: BigInt(Date.now()),
      };
      
      addProduct(newProduct);
      toast.success('Product listed successfully!');
      navigate({ to: '/user/sell/confirmation/$listingId', params: { listingId } });
    } catch (error) {
      toast.error('Failed to list product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Sell Your Product</h1>
      
      <Progress value={(step / 4) * 100} className="mb-8" />

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="images">Product Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            {images.length > 0 && (
              <p className="text-sm text-muted-foreground">{images.length} image(s) selected</p>
            )}
            <Button onClick={handleDetectCategory} disabled={loading || images.length === 0} variant="outline">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Detect Category (AI)
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              placeholder="e.g., iPhone 12 Pro"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as ProductCategory)}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ProductCategory.electronics}>Electronics</SelectItem>
                <SelectItem value={ProductCategory.furniture}>Furniture</SelectItem>
                <SelectItem value={ProductCategory.clothing}>Clothing</SelectItem>
                <SelectItem value={ProductCategory.books}>Books</SelectItem>
                <SelectItem value={ProductCategory.sports}>Sports</SelectItem>
                <SelectItem value={ProductCategory.homeAppliances}>Home Appliances</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select value={condition} onValueChange={(value) => setCondition(value as ProductCondition)}>
              <SelectTrigger id="condition">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ProductCondition.new_}>New</SelectItem>
                <SelectItem value={ProductCondition.likeNew}>Like New</SelectItem>
                <SelectItem value={ProductCondition.good}>Good</SelectItem>
                <SelectItem value={ProductCondition.fair}>Fair</SelectItem>
                <SelectItem value={ProductCondition.poor}>Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Product Age (years): {age}</Label>
            <Slider value={[age]} onValueChange={(value) => setAge(value[0])} min={0} max={10} step={1} />
          </div>

          <Button onClick={handleEstimatePrice} disabled={loading} variant="outline">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Estimate Price (AI)
          </Button>

          {priceRange.suggested > 0 && (
            <div className="space-y-2">
              <Label>Price (₹{priceRange.min} - ₹{priceRange.max})</Label>
              <p className="text-sm text-muted-foreground">AI Suggested: ₹{priceRange.suggested}</p>
              <Slider
                value={[price]}
                onValueChange={(value) => setPrice(value[0])}
                min={priceRange.min}
                max={priceRange.max}
                step={100}
              />
              <p className="text-lg font-bold">₹{price}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your product..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
            <Button onClick={handleGenerateDescription} disabled={loading || !title} variant="outline">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Generate Description (AI)
            </Button>
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full" size="lg">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            List Product
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
