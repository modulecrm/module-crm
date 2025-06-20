
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign, Calendar, User, Building2, Plus, X, Trash2 } from 'lucide-react';

interface Deal {
  id: string;
  title: string;
  company_name: string;
  contact_person: string;
  value: number;
  currency: string;
  stage: string;
  probability: number;
  expected_close_date: string;
  pipeline: string;
}

interface PipelineStage {
  id: string;
  name: string;
  position: number;
  color: string;
}

interface Pipeline {
  id: string;
  name: string;
  description?: string;
  stages: PipelineStage[];
}

interface CustomStage {
  name: string;
  color: string;
}

const SalesPipeline = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);
  const [activePipeline, setActivePipeline] = useState('virtual-office');
  const [isNewPipelineDialogOpen, setIsNewPipelineDialogOpen] = useState(false);
  const [newPipelineName, setNewPipelineName] = useState('');
  const [customStages, setCustomStages] = useState<CustomStage[]>([
    { name: 'Lead', color: '#3B82F6' },
    { name: 'Qualified', color: '#8B5CF6' },
    { name: 'Proposal', color: '#F59E0B' },
    { name: 'Closed Won', color: '#059669' },
    { name: 'Closed Lost', color: '#DC2626' },
  ]);

  // Define pipelines with their specific stages
  const pipelines: Pipeline[] = [
    {
      id: 'virtual-office',
      name: 'Virtual Office',
      stages: [
        { id: 'lead', name: 'Lead', position: 1, color: '#3B82F6' },
        { id: 'sign-contract', name: 'Sign Contract', position: 2, color: '#8B5CF6' },
        { id: 'kyc', name: 'KYC', position: 3, color: '#F59E0B' },
        { id: 'payment', name: 'Payment', position: 4, color: '#10B981' },
        { id: 'closed-won', name: 'Closed Won', position: 5, color: '#059669' },
        { id: 'closed-lost', name: 'Closed Lost', position: 6, color: '#DC2626' },
        { id: 'closed-rejected', name: 'Closed Rejected', position: 7, color: '#6B7280' },
      ]
    },
    {
      id: 'business-creation',
      name: 'Business Creation',
      stages: [
        { id: 'lead', name: 'Lead', position: 1, color: '#3B82F6' },
        { id: 'sign-contract', name: 'Sign Contract', position: 2, color: '#8B5CF6' },
        { id: 'kyc', name: 'KYC', position: 3, color: '#F59E0B' },
        { id: 'payment', name: 'Payment', position: 4, color: '#10B981' },
        { id: 'creation', name: 'Creation', position: 5, color: '#06B6D4' },
        { id: 'closed-won', name: 'Closed Won', position: 6, color: '#059669' },
        { id: 'closed-lost', name: 'Closed Lost', position: 7, color: '#DC2626' },
        { id: 'closed-rejected', name: 'Closed Rejected', position: 8, color: '#6B7280' },
      ]
    },
    {
      id: 'call-handling',
      name: 'Call Handling',
      stages: [
        { id: 'lead', name: 'Lead', position: 1, color: '#3B82F6' },
        { id: 'sign-contract', name: 'Sign Contract', position: 2, color: '#8B5CF6' },
        { id: 'payment', name: 'Payment', position: 3, color: '#10B981' },
        { id: 'setup', name: 'Setup', position: 4, color: '#06B6D4' },
        { id: 'closed-won', name: 'Closed Won', position: 5, color: '#059669' },
        { id: 'closed-lost', name: 'Closed Lost', position: 6, color: '#DC2626' },
        { id: 'closed-rejected', name: 'Closed Rejected', position: 7, color: '#6B7280' },
      ]
    }
  ];

  // Sample deals data
  const sampleDeals: Deal[] = [
    // Virtual Office deals
    { id: '1', title: 'Virtual Office Package', company_name: 'TechStart Inc.', contact_person: 'John Smith', value: 1200, currency: 'USD', stage: 'lead', probability: 20, expected_close_date: '2024-07-15', pipeline: 'virtual-office' },
    { id: '2', title: 'Premium Virtual Office', company_name: 'Digital Solutions Ltd.', contact_person: 'Sarah Johnson', value: 2400, currency: 'USD', stage: 'sign-contract', probability: 60, expected_close_date: '2024-07-10', pipeline: 'virtual-office' },
    { id: '3', title: 'Basic Virtual Office', company_name: 'Startup Hub', contact_person: 'Mike Wilson', value: 800, currency: 'USD', stage: 'kyc', probability: 75, expected_close_date: '2024-07-08', pipeline: 'virtual-office' },
    { id: '4', title: 'Corporate Virtual Office', company_name: 'Enterprise Corp', contact_person: 'Lisa Brown', value: 3600, currency: 'USD', stage: 'payment', probability: 90, expected_close_date: '2024-07-05', pipeline: 'virtual-office' },
    
    // Business Creation deals
    { id: '5', title: 'LLC Formation', company_name: 'NewBiz Ventures', contact_person: 'David Lee', value: 2500, currency: 'USD', stage: 'lead', probability: 30, expected_close_date: '2024-07-20', pipeline: 'business-creation' },
    { id: '6', title: 'Corporation Setup', company_name: 'Future Industries', contact_person: 'Emma Davis', value: 4500, currency: 'USD', stage: 'sign-contract', probability: 65, expected_close_date: '2024-07-12', pipeline: 'business-creation' },
    { id: '7', title: 'Partnership Formation', company_name: 'Twin Enterprises', contact_person: 'Robert Kim', value: 1800, currency: 'USD', stage: 'creation', probability: 85, expected_close_date: '2024-07-03', pipeline: 'business-creation' },
    
    // Call Handling deals
    { id: '8', title: 'Phone Answering Service', company_name: 'Medical Practice', contact_person: 'Dr. Anderson', value: 1500, currency: 'USD', stage: 'lead', probability: 25, expected_close_date: '2024-07-18', pipeline: 'call-handling' },
    { id: '9', title: 'Virtual Receptionist', company_name: 'Law Firm Associates', contact_person: 'Attorney Miller', value: 2200, currency: 'USD', stage: 'payment', probability: 80, expected_close_date: '2024-07-07', pipeline: 'call-handling' },
    { id: '10', title: 'Call Center Package', company_name: 'Sales Company', contact_person: 'Tom Richards', value: 3800, currency: 'USD', stage: 'setup', probability: 90, expected_close_date: '2024-07-02', pipeline: 'call-handling' },
  ];

  const [customPipelines, setCustomPipelines] = useState<Pipeline[]>([]);

  useEffect(() => {
    setDeals(sampleDeals);
  }, []);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;

    // Update local state
    setDeals(prevDeals => 
      prevDeals.map(deal => 
        deal.id === draggableId 
          ? { ...deal, stage: destination.droppableId }
          : deal
      )
    );
  };

  const getCurrentPipeline = () => {
    return [...pipelines, ...customPipelines].find(p => p.id === activePipeline) || pipelines[0];
  };

  const getDealsByStage = (stageId: string) => {
    return deals.filter(deal => deal.stage === stageId && deal.pipeline === activePipeline);
  };

  const getStageTotal = (stageId: string) => {
    return getDealsByStage(stageId).reduce((sum, deal) => sum + (deal.value || 0), 0);
  };

  const getOpenDealsCount = (pipelineId: string) => {
    return deals.filter(deal => 
      deal.pipeline === pipelineId && 
      !deal.stage.includes('closed')
    ).length;
  };

  const addCustomStage = () => {
    setCustomStages([...customStages, { name: '', color: '#3B82F6' }]);
  };

  const removeCustomStage = (index: number) => {
    setCustomStages(customStages.filter((_, i) => i !== index));
  };

  const updateCustomStage = (index: number, field: 'name' | 'color', value: string) => {
    setCustomStages(customStages.map((stage, i) => 
      i === index ? { ...stage, [field]: value } : stage
    ));
  };

  const handleCreatePipeline = () => {
    if (newPipelineName.trim() && customStages.every(stage => stage.name.trim())) {
      const newPipeline: Pipeline = {
        id: newPipelineName.toLowerCase().replace(/\s+/g, '-'),
        name: newPipelineName.trim(),
        stages: customStages.map((stage, index) => ({
          id: stage.name.toLowerCase().replace(/\s+/g, '-'),
          name: stage.name.trim(),
          position: index + 1,
          color: stage.color
        }))
      };
      setCustomPipelines(prev => [...prev, newPipeline]);
      setActivePipeline(newPipeline.id);
      setNewPipelineName('');
      setCustomStages([
        { name: 'Lead', color: '#3B82F6' },
        { name: 'Qualified', color: '#8B5CF6' },
        { name: 'Proposal', color: '#F59E0B' },
        { name: 'Closed Won', color: '#059669' },
        { name: 'Closed Lost', color: '#DC2626' },
      ]);
      setIsNewPipelineDialogOpen(false);
    }
  };

  const currentPipeline = getCurrentPipeline();
  const allPipelines = [...pipelines, ...customPipelines];
  const pipelineDeals = deals.filter(deal => deal.pipeline === activePipeline);
  const totalPipelineValue = pipelineDeals.reduce((sum, deal) => sum + (deal.value || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales Pipeline</h2>
          <p className="text-gray-600 mt-1">
            Active Pipeline: <span className="font-medium">{currentPipeline?.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>Total Pipeline Value: ${totalPipelineValue.toLocaleString()}</span>
        </div>
      </div>

      {/* Pipeline Selection Buttons */}
      <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
        {allPipelines.map((pipeline) => {
          const openDealsCount = getOpenDealsCount(pipeline.id);
          return (
            <Button
              key={pipeline.id}
              variant={activePipeline === pipeline.id ? "default" : "outline"}
              onClick={() => setActivePipeline(pipeline.id)}
              className="min-w-0 flex items-center gap-2"
            >
              {pipeline.name}
              {openDealsCount > 0 && (
                <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-800">
                  {openDealsCount}
                </Badge>
              )}
            </Button>
          );
        })}
        
        <Dialog open={isNewPipelineDialogOpen} onOpenChange={setIsNewPipelineDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-dashed">
              <Plus className="h-4 w-4 mr-2" />
              New Pipeline
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Pipeline</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div>
                <Label htmlFor="pipeline-name">Pipeline Name</Label>
                <Input
                  id="pipeline-name"
                  value={newPipelineName}
                  onChange={(e) => setNewPipelineName(e.target.value)}
                  placeholder="Enter pipeline name"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Pipeline Stages</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addCustomStage}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Stage
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {customStages.map((stage, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="flex-1">
                        <Input
                          placeholder="Stage name"
                          value={stage.name}
                          onChange={(e) => updateCustomStage(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={stage.color}
                          onChange={(e) => updateCustomStage(index, 'color', e.target.value)}
                          className="w-8 h-8 rounded border cursor-pointer"
                        />
                        {customStages.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeCustomStage(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsNewPipelineDialogOpen(false);
                    setNewPipelineName('');
                    setCustomStages([
                      { name: 'Lead', color: '#3B82F6' },
                      { name: 'Qualified', color: '#8B5CF6' },
                      { name: 'Proposal', color: '#F59E0B' },
                      { name: 'Closed Won', color: '#059669' },
                      { name: 'Closed Lost', color: '#DC2626' },
                    ]);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreatePipeline}>
                  Create Pipeline
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {currentPipeline.stages.map((stage) => {
            const stageDeals = getDealsByStage(stage.id);
            const stageTotal = getStageTotal(stage.id);
            
            return (
              <div key={stage.id} className="flex-shrink-0 w-80">
                <Card className="h-full">
                  <div className="p-4 border-b" style={{ borderTopColor: stage.color, borderTopWidth: '4px' }}>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                      <Badge variant="secondary" className="bg-gray-100">
                        {stageDeals.length}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      Total: ${stageTotal.toLocaleString()}
                    </div>
                  </div>

                  <Droppable droppableId={stage.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`p-4 space-y-3 min-h-[300px] ${
                          snapshot.isDraggingOver ? 'bg-blue-50' : ''
                        }`}
                      >
                        {stageDeals.map((deal, index) => (
                          <Draggable key={deal.id} draggableId={deal.id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`cursor-pointer hover:shadow-md transition-shadow ${
                                  snapshot.isDragging ? 'rotate-2 shadow-lg' : ''
                                }`}
                              >
                                <CardContent className="p-4">
                                  <div className="space-y-3">
                                    <div>
                                      <h4 className="font-medium text-gray-900 text-sm mb-1">{deal.title}</h4>
                                      <div className="flex items-center text-xs text-gray-600 mb-1">
                                        <Building2 className="h-3 w-3 mr-1" />
                                        {deal.company_name}
                                      </div>
                                      <div className="flex items-center text-xs text-gray-600">
                                        <User className="h-3 w-3 mr-1" />
                                        {deal.contact_person}
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm">
                                      <div className="flex items-center text-green-600 font-medium">
                                        <DollarSign className="h-3 w-3 mr-1" />
                                        {deal.value?.toLocaleString() || '0'}
                                      </div>
                                      
                                      <div className="flex items-center text-gray-500 text-xs">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {new Date(deal.expected_close_date).toLocaleDateString()}
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Probability</span>
                                        <span>{deal.probability}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <div 
                                          className="h-1.5 rounded-full transition-all duration-300" 
                                          style={{ 
                                            width: `${deal.probability}%`,
                                            backgroundColor: stage.color
                                          }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Card>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default SalesPipeline;
