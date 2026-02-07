import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from '@tanstack/react-router';
import { useKindKartData } from '../../state/KindKartDataContext';
import DonationBudgetPlanner from '../../components/donations/DonationBudgetPlanner';

export default function DonateNeedBoardPage() {
  const { ngos, requirements } = useKindKartData();
  const navigate = useNavigate();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">NGO Need Board</h1>
      
      <DonationBudgetPlanner />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ngos.map((ngo) => {
          const ngoReqs = requirements.filter((r) => r.ngoId === ngo.id && r.status === 'active');
          return (
            <Card key={ngo.id}>
              <CardHeader>
                <CardTitle>{ngo.name}</CardTitle>
                <CardDescription>{ngo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm font-medium">Current Needs:</p>
                  {ngoReqs.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No active needs at the moment</p>
                  ) : (
                    ngoReqs.map((req) => (
                      <div key={req.id} className="flex items-center justify-between">
                        <span className="text-sm">{req.itemName}</span>
                        <Badge variant={req.urgency === 'high' ? 'destructive' : 'secondary'}>
                          {req.urgency}
                        </Badge>
                      </div>
                    ))
                  )}
                  <Button 
                    className="w-full mt-4"
                    onClick={() => navigate({ to: '/user/donate/payment/$ngoId', params: { ngoId: ngo.id } })}
                  >
                    Donate Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
