import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';
import { useRewards } from '../../state/RewardsContext';

export default function LeaderboardPage() {
  const { leaderboard } = useRewards();

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Trophy className="h-8 w-8 text-primary" />
        Leaderboard
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Top Contributors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.map((entry) => (
              <div key={entry.userId} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge variant={entry.rank <= 3 ? 'default' : 'secondary'} className="text-lg">
                    #{entry.rank}
                  </Badge>
                  <div>
                    <p className="font-semibold">{entry.userName}</p>
                    <p className="text-sm text-muted-foreground">{entry.donations} donations</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-primary">{entry.credits} credits</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
