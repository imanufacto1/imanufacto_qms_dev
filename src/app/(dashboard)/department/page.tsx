import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid } from "lucide-react";

export default function DepartmentPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-2">
        <Grid className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Department Management</h1>
      </div>
      <p className="text-muted-foreground">
        Manage departments within plants.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Department list and management will be implemented here.</p>
          <p className="mt-2 text-sm text-muted-foreground">
             Requires Plant selection to view/add departments.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
