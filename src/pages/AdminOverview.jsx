export default function AdminOverview() {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Overview Metrics</h2>
        <p className="text-sm text-muted-foreground">Quick look at your marketplace vitals today.</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-xl border border-muted/60 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium">Daily Sales</p>
          <p className="text-xl font-bold mt-1">Ksh. 18,400</p>
        </div>
        <div className="bg-card p-4 rounded-xl border border-muted/60 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium">Signups</p>
          <p className="text-xl font-bold mt-1">+14 Users</p>
        </div>
      </div>
    </div>
  );
}