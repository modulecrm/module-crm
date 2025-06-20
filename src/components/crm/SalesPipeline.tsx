
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Calendar, User, Plus } from 'lucide-react';

interface Deal {
  id: string;
  title: string;
  value: number;
  currency: string;
  stage: string;
  probability: number;
  expected_close_date: string;
  customer_id: string;
  customer_name?: string;
}

interface PipelineStage {
  id: string;
  name: string;
  position: number;
  color: string;
  probability_default: number;
}

interface Pipeline {
  id: string;
  name: string;
  description?: string;
}

const SalesPipeline = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePipeline, setActivePipeline] = useState('virtual-office');
  const [isNewPipelineDialogOpen, setIsNewPipelineDialogOpen] = useState(false);
  const [newPipelineName, setNewPipelineName] = useState('');

  // Predefined pipelines
  const predefinedPipelines: Pipeline[] = [
    { id: 'virtual-office', name: 'Virtual Office' },
    { id: 'telephone-answering', name: 'Telephone Answering' },
    { id: 'business-creation', name: 'Business Creation' },
  ];

  const [customPipelines, setCustomPipelines] = useState<Pipeline[]>([]);

  useEffect(() => {
    fetchPipelineData();
  }, [activePipeline]);

  const fetchPipelineData = async () => {
    try {
      // Fetch stages
      const { data: stagesData, error: stagesError } = await supabase
        .from('pipeline_stages')
        .select('*')
        .order('position');

      if (stagesError) throw stagesError;

      // Fetch deals with customer names
      const { data: dealsData, error: dealsError } = await supabase
        .from('deals')
        .select(`
          *,
          customers (name)
        `);

      if (dealsError) throw dealsError;

      setStages(stagesData || []);
      setDeals(dealsData?.map(deal => ({
        ...deal,
        customer_name: deal.customers?.name
      })) || []);
    } catch (error) {
      console.error('Error fetching pipeline data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;

    // Update deal stage in database
    try {
      const { error } = await supabase
        .from('deals')
        .update({ stage: destination.droppableId })
        .eq('id', draggableId);

      if (error) throw error;

      // Update local state
      setDeals(prevDeals => 
        prevDeals.map(deal => 
          deal.id === draggableId 
            ? { ...deal, stage: destination.droppableId }
            : deal
        )
      );
    } catch (error) {
      console.error('Error updating deal:', error);
    }
  };

  const getDealsByStage = (stageName: string) => {
    return deals.filter(deal => deal.stage === stageName.toLowerCase());
  };

  const getStageTotal = (stageName: string) => {
    return getDealsByStage(stageName).reduce((sum, deal) => sum + (deal.value || 0), 0);
  };

  const handleCreatePipeline = () => {
    if (newPipelineName.trim()) {
      const newPipeline: Pipeline = {
        id: newPipelineName.toLowerCase().replace(/\s+/g, '-'),
        name: newPipelineName.trim()
      };
      setCustomPipelines(prev => [...prev, newPipeline]);
      setActivePipeline(newPipeline.id);
      setNewPipelineName('');
      setIsNewPipelineDialogOpen(false);
    }
  };

  const allPipelines = [...predefinedPipelines, ...customPipelines];
  const currentPipeline = allPipelines.find(p => p.id === activePipeline);

  if (loading) {
    return <div className="p-8">Loading pipeline...</div>;
  }

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
          <span>Total Pipeline Value: ${deals.reduce((sum, deal) => sum + (deal.value || 0), 0).toLocaleString()}</span>
        </div>
      </div>

      {/* Pipeline Selection Buttons */}
      <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
        {allPipelines.map((pipeline) => (
          <Button
            key={pipeline.id}
            variant={activePipeline === pipeline.id ? "default" : "outline"}
            onClick={() => setActivePipeline(pipeline.id)}
            className="min-w-0"
          >
            {pipeline.name}
          </Button>
        ))}
        
        <Dialog open={isNewPipelineDialogOpen} onOpenChange={setIsNewPipelineDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-dashed">
              <Plus className="h-4 w-4 mr-2" />
              New Pipeline
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Pipeline</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="pipeline-name">Pipeline Name</Label>
                <Input
                  id="pipeline-name"
                  value={newPipelineName}
                  onChange={(e) => setNewPipelineName(e.target.value)}
                  placeholder="Enter pipeline name"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsNewPipelineDialogOpen(false);
                    setNewPipelineName('');
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
          {stages.map((stage) => {
            const stageDeals = getDealsByStage(stage.name);
            const stageTotal = getStageTotal(stage.name);
            
            return (
              <div key={stage.id} className="flex-shrink-0 w-80">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                    <Badge variant="secondary">
                      {stageDeals.length}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    Total: ${stageTotal.toLocaleString()}
                  </div>

                  <Droppable droppableId={stage.name.toLowerCase()}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-3 min-h-[200px] ${
                          snapshot.isDraggingOver ? 'bg-blue-50' : ''
                        }`}
                      >
                        {stageDeals.map((deal, index) => (
                          <Draggable key={deal.id} draggableId={deal.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow ${
                                  snapshot.isDragging ? 'rotate-2' : ''
                                }`}
                              >
                                <h4 className="font-medium text-gray-900 mb-2">{deal.title}</h4>
                                
                                {deal.customer_name && (
                                  <div className="flex items-center text-sm text-gray-600 mb-2">
                                    <User className="h-3 w-3 mr-1" />
                                    {deal.customer_name}
                                  </div>
                                )}
                                
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center text-green-600">
                                    <DollarSign className="h-3 w-3 mr-1" />
                                    {deal.value?.toLocaleString() || '0'}
                                  </div>
                                  
                                  {deal.expected_close_date && (
                                    <div className="flex items-center text-gray-500">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      {new Date(deal.expected_close_date).toLocaleDateString()}
                                    </div>
                                  )}
                                </div>
                                
                                <div className="mt-2">
                                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Probability</span>
                                    <span>{deal.probability}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1">
                                    <div 
                                      className="bg-blue-600 h-1 rounded-full" 
                                      style={{ width: `${deal.probability}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default SalesPipeline;
