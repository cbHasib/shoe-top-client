export const CREATE_PRODUCT_INPUTS = [
    {
        label: 'Product Name',
        name: 'name',
        type: 'text',
        required: true, 
        placeholder: 'Enter product name',
    },  
    {
        label: 'Price',
        name: 'price',
        type: 'number',
        required: true, 
        placeholder: 'Enter price',
    },  
    {
        label: 'Quantity',
        name: 'quantity',
        type: 'number',
        required: true, 
        placeholder: 'Enter quantity',
    },  
    {
        label: 'Release Date',
        name: 'releaseDate',
        type: 'date',
        required: true, 
        placeholder: 'Enter release date',
    },  
    {
        label: 'Brand',
        name: 'brand',
        type: 'text',
        required: true, 
        placeholder: 'Enter brand',
    },  
    {
        label: 'Model',
        name: 'model',
        type: 'text',
        required: true, 
        placeholder: 'Enter model',
    },  
    {
        label: 'Color',
        name: 'color',
        type: 'text',
        required: true, 
        placeholder: 'Enter color',
    },  
    {
        label: 'Size',
        name: 'size',
        type: 'select',
        required: true, 
        placeholder: 'Enter size',
        options: [
            { label: 'XS', value: 'XS' },
            { label: 'S', value: 'S' },
            { label: 'M', value: 'M' },
            { label: 'L', value: 'L' },
            { label: 'XL', value: 'XL' },
            { label: 'XXL', value: 'XXL' },
            { label: 'XXXL', value: 'XXXL'}
        ]
    },  
    {
        label: 'Weight',
        name: 'weight',
        type: 'number',
        required: true, 
        placeholder: 'Enter weight',
    },  
    {
        label: 'Style',
        name: 'style',
        type: 'select',
        required: true, 
        placeholder: 'Enter style',
        options: [
            { label: 'Casual', value: 'casual' },
            { label: 'Sport', value: 'sport' },
            { label: 'Formal', value: 'formal' },
            { label: 'Other', value: 'other' },
        ]
    },  
    {
        label: 'Material',
        name: 'material',
        type: 'select',
        required: true, 
        placeholder: 'Enter material',
        options: [
            { label: 'Leather', value: 'leather' },
            { label: 'Fabric', value: 'fabric' },
            { label: 'Synthetic', value: 'synthetic' },
        ]
    },  
    {
        label: 'Description',
        name: 'description',
        type: 'text',
        required: true, 
        placeholder: 'Enter description',
    },  
    // {
    //     label: 'Images',
    //     name: 'images',
    //     type: 'file',
    //     required: true, 
    //     placeholder: 'Enter images',
    // },
]