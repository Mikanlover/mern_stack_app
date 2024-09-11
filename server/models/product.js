import mongoose from 'mongoose';
import moment from 'moment';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
});

productSchema.methods.toJSON = function() {
    const obj = this.toObject();
    obj.created_at = moment(obj.created_at).format('DD-MM-YYYY HH:mm:ss');
    obj.updated_at = moment(obj.updated_at).format('DD-MM-YYYY HH:mm:ss');
    return obj;
};

const Product = mongoose.model('Product', productSchema);

export default Product;