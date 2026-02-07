import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useChat } from '../../state/ChatContext';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function ChatLauncher() {
  const { threads, activeThreadId, setActiveThreadId, sendMessage } = useChat();
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const unreadCount = threads.reduce((sum, t) => sum + t.unread, 0);
  const activeThread = threads.find((t) => t.id === activeThreadId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && activeThreadId) {
      sendMessage(activeThreadId, message);
      setMessage('');
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Messages</SheetTitle>
          </SheetHeader>

          {!activeThreadId ? (
            <ScrollArea className="flex-1 p-4">
              {threads.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-8">
                  No conversations yet
                </div>
              ) : (
                <div className="space-y-2">
                  {threads.map((thread) => (
                    <div
                      key={thread.id}
                      className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50"
                      onClick={() => setActiveThreadId(thread.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{thread.participantName}</p>
                          <p className="text-xs text-muted-foreground truncate">{thread.lastMessage}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDistanceToNow(thread.lastMessageTime, { addSuffix: true })}
                          </p>
                        </div>
                        {thread.unread > 0 && (
                          <Badge variant="default" className="ml-2">
                            {thread.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          ) : (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold">{activeThread?.participantName}</h3>
                <Button variant="ghost" size="sm" onClick={() => setActiveThreadId(null)}>
                  Back
                </Button>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {activeThread?.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit">Send</Button>
              </form>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
