import express, { Request, Response } from 'express';
import { requireAuth } from '@tdh-tickets/common';
import { Order } from '../models/order';
import { Ticket } from '../models/ticket';
const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
    const orders = await Order.find({
        userId: req.currentUser!.id
    }).populate('ticket');

    res.send(orders);
});

router.get('/api/orders/tickets', requireAuth, async (req: Request, res: Response) => {
    // const orders = await Order.find({
    //     userId: req.currentUser!.id
    // }).populate('ticket');

    // res.send(orders);

    const tickets = await Ticket.find({});

    res.send(tickets);
});

export { router as indexOrderRouter };