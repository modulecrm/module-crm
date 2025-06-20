
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerEmail: string;
  customerName: string;
  taskTitle: string;
}

const EmailDialog: React.FC<EmailDialogProps> = ({
  open,
  onOpenChange,
  customerEmail,
  customerName,
  taskTitle
}) => {
  const [subject, setSubject] = useState(`Regarding: ${taskTitle}`);
  const [message, setMessage] = useState(`Dear ${customerName},\n\nI hope this email finds you well.\n\nBest regards,`);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const sendEmail = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both subject and message.",
        variant: "destructive"
      });
      return;
    }

    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: customerEmail,
          subject: subject.trim(),
          html: message.replace(/\n/g, '<br>'),
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Email sent successfully."
      });

      onOpenChange(false);
      setSubject(`Regarding: ${taskTitle}`);
      setMessage(`Dear ${customerName},\n\nI hope this email finds you well.\n\nBest regards,`);
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send email. Please check your email configuration.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send Email to {customerName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>To</Label>
            <Input value={customerEmail} readOnly className="bg-gray-50" />
          </div>

          <div>
            <Label>Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
            />
          </div>

          <div>
            <Label>Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows={8}
            />
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={sending}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={sendEmail}
            disabled={sending}
          >
            <Send className="h-4 w-4 mr-2" />
            {sending ? 'Sending...' : 'Send Email'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
