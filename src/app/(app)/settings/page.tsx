'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-headline font-bold">Settings</h1>
            <div className="grid gap-6">
                 <Card>
                    <CardHeader>
                    <CardTitle>Store</CardTitle>
                    <CardDescription>
                        Used to identify your store in the marketplace.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <form>
                        <Input placeholder="Store Name" />
                    </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                    <CardTitle>Plugins</CardTitle>
                    <CardDescription>
                        Manage the plugins that are available in your store.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-4 rounded-lg border p-4">
                            <Checkbox id="plugins-inventory" />
                            <div className="grid gap-1">
                                <label htmlFor="plugins-inventory" className="font-bold">Inventory Management</label>
                                <p className="text-sm text-muted-foreground">
                                    Enable inventory tracking and management for your products.
                                </p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4 rounded-lg border p-4">
                            <Checkbox id="plugins-shipping" defaultChecked/>
                            <div className="grid gap-1">
                                <label htmlFor="plugins-shipping" className="font-bold">Shipping Rates</label>
                                <p className="text-sm text-muted-foreground">
                                    Calculate and display shipping rates at checkout.
                                </p>
                            </div>
                        </div>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
