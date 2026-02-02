import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export default function OrganizationPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-2">
        <Building2 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Organization Management</h1>
      </div>
      <p className="text-muted-foreground">
        Manage your organizations here. This is the top level of the hierarchy.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Organization list and management will be implemented here.</p>
          <p className="mt-2 text-sm text-muted-foreground">
             Hierarchy: Organization &rarr; Plant &rarr; Department &rarr; Role &rarr; User
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
