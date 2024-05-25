import withAuth from '@/hoc/withAuth'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Layout from '@/components/dashboard/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toRupiah } from '@/util/rupiahFormater'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Package, ShoppingCart, MoreHorizontal, Banknote } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import { useEffect, useState } from 'react'

const OrdersPage = () => {

    const { authToken, user } = useAuth();

    const [orders, setOrders] = useState<Order[]>([]);

    const getOrders = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_ORDER_URL}/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            const data = await response.data
            setOrders(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrders();
    }, [])

  return (
    <Layout>
        <div className="flex justify-between gap-8 items-center">

        <Card className='w-full'>
            <CardHeader>
                <div className="flex items-center gap-4">

            <Banknote className="h-10 w-10 text-primary" />
                <div className="">
                    <h4 className="text-xl font-semibold">Balance</h4>
                    <p className="text-lg text-muted-foreground">{toRupiah(user.balance)}</p>
                </div>
                </div>
            </CardHeader>
        </Card>
        <Card className='w-full'>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Package className="h-10 w-10 text-primary" />
                    <div>
                        <h4 className="text-xl font-semibold">Total Orders</h4>
                        <p className="text-lg text-muted-foreground">You have made 10 orders</p>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <Card className='w-full'>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <ShoppingCart className="h-10 w-10 text-primary" />
                    <div>
                        <h4 className="text-xl font-semibold">Wishlisted Items</h4>
                        <p className="text-lg text-muted-foreground">You have 3 items in your cart</p>
                    </div>
                </div>
            </CardHeader>
        </Card>
        </div>
        <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                        Here are the list of orders you&apos;ve made
                    </CardDescription>
                </CardHeader>
                <CardContent>
        <Table>
            <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Subtotal</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Status
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Date
                                </TableHead>
                                <TableHead>
                                    <span className="">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
            <TableBody>
            {
                orders.map(order => (
                    <TableRow key={order.id}>
            <TableCell className="font-medium">
                {order.id}
            </TableCell>
            <TableCell className="font-medium">
                {order.product_name}
            </TableCell>
            <TableCell>{toRupiah(order.subtotal)}</TableCell>
            <TableCell className="hidden md:table-cell">
                <Badge variant="default">{order.status}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {order.created_at}
            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Pay</DropdownMenuItem>
                        <DropdownMenuItem>Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
                ))
            }
            
            </TableBody>
        </Table>
        </CardContent>
            </Card>
    </Layout>
  )
}

export default withAuth(OrdersPage)