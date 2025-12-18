'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useMemo } from 'react';
import { mockSites, mockOrganizations, mockDocuments } from '@/lib/data';

// This is a mock user list for demonstration.
// In a real application, this data would come from Firestore.
const mockUsers = [
    {
        id: 'user-1',
        name: 'Alice Johnson',
        email: 'alice@innovatecorp.com',
        role: 'Org Admin',
        organizationId: 'org-1',
    },
    {
        id: 'user-2',
        name: 'Bob Williams',
        email: 'bob@innovatecorp.com',
        role: 'Site Manager',
        organizationId: 'org-1',
    },
    {
        id: 'user-3',
        name: 'Charlie Brown',
        email: 'charlie@futuresolutions.com',
        role: 'Site Manager',
        organizationId: 'org-2',
    },
    {
        id: 'user-4',
        name: 'Diana Prince',
        email: 'diana@futuresolutions.com',
        role: 'Org Admin',
        organizationId: 'org-2',
    }
];

export default function UsersPage() {
    const usersByOrg = useMemo(() => {
        return mockOrganizations.map(org => ({
            ...org,
            users: mockUsers.filter(user => user.organizationId === org.id)
        }));
    }, []);

    const roleVariant = (role: string) => {
        switch (role) {
            case 'Admin':
                return 'destructive';
            case 'Org Admin':
                return 'default';
            case 'Site Manager':
                return 'secondary';
            default:
                return 'outline';
        }
    };


  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-headline font-bold">Users</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Invite User
            </Button>
        </div>

        <div className="space-y-8">
            {usersByOrg.map(org => (
                <Card key={org.id}>
                    <CardHeader>
                        <CardTitle className="font-headline">{org.name}</CardTitle>
                        <CardDescription>
                            Users in the {org.name} organization.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {org.users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={roleVariant(user.role)}>{user.role}</Badge>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
