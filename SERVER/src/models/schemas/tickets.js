import mongoose from "mongoose";

const TicketCollection = "ticket"

const TicketSchema = new mongoose.Schema({
    type: Object,
})

const TicketModel = mongoose.model(TicketCollection, TicketSchema)
export default TicketModel