export default function AdminOrders() {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Orders Queue</h2>
        <p className="text-sm text-muted-foreground">Manage ongoing customer transactions.</p>
      </div>
      <div className="bg-card rounded-xl border p-6 text-center text-sm text-muted-foreground">
        All system checkouts are up to date. No pending shipping logs found.
      </div>
    </div>
  );
}