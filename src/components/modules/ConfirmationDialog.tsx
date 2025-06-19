
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  module: any;
  action: 'enable' | 'disable';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog = ({ isOpen, module, action, onConfirm, onCancel }: ConfirmationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === 'enable' ? 'Enable' : 'Disable'} Module
          </DialogTitle>
          <DialogDescription>
            {action === 'enable' ? (
              <>
                You are about to enable <strong>{module?.name}</strong>.
                <br />
                <span className="text-lg font-semibold text-gray-900 mt-2 block">
                  Price: {module?.price}
                </span>
                <br />
                Do you want to proceed with this subscription?
              </>
            ) : (
              <>
                You are about to disable <strong>{module?.name}</strong>.
                <br />
                This will cancel your subscription and you will lose access to this module.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            {action === 'enable' ? 'Accept & Enable' : 'Disable'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
