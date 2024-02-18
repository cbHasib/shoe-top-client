export const CREATE_SERVICE_REQUEST_INPUTS = [ 
    {
        label: 'Shoe Brand',
        name: 'shoeBrand',
        type: 'text',
        required: true, 
        placeholder: 'Enter Your Shoe Brand',
    },  
    {
        label: 'Shoe Model',
        name: 'shoeModel',
        type: 'text',
        required: true, 
        placeholder: 'Enter Your Shoe Model',
    },
    {
        label: 'Shoe Color',
        name: 'shoeColor',
        type: 'select',
        required: true, 
        placeholder: 'Enter shoe color',
        options: [
            { label: 'Black', value: 'Black' },
            { label: 'White', value: 'White' },
            { label: 'Red', value: 'Red' },
            { label: 'Blue', value: 'Blue' },
            { label: 'Green', value: 'Green' },
            { label: 'Yellow', value: 'Yellow' },
            { label: 'Orange', value: 'Orange' },
            { label: 'Purple', value: 'Purple' },
            { label: 'Pink', value: 'Pink' },
            { label: 'Brown', value: 'Brown' },
            { label: 'Grey', value: 'Grey' },
            { label: 'Ivory', value: 'Ivory' },
            { label: 'Beige', value: 'Beige' },
            { label: 'Multi-color', value: 'Multi-color' },
            { label: 'Other', value: 'Other' },
        ]
    },  
    {
        label: 'Shoe Size',
        name: 'shoeSize',
        type: 'select',
        required: true, 
        placeholder: 'Enter shoe size',
        options: [
            { label: 'XS', value: 'XS' },
            { label: 'S', value: 'S' },
            { label: 'M', value: 'M' },
            { label: 'L', value: 'L' },
            { label: 'XL', value: 'XL' },
            { label: 'XXL', value: 'XXL' },
            { label: 'XXXL', value: 'XXXL'},
            { label: 'Other', value: 'Other'}
        ]
    },  
    
    {
        label: 'Shoe Material',
        name: 'shoeMaterial',
        type: 'select',
        required: false, 
        placeholder: 'Enter shoe material',
        options: [
            { label: 'Leather', value: 'leather' },
            { label: 'Fabric', value: 'fabric' },
            { label: 'Synthetic', value: 'synthetic' },
            { label: 'Other', value: 'Other'}
        ]
    },  
    {
        label: 'Polish Type',
        name: 'polishType',
        type: 'select',
        required: true, 
        placeholder: 'Enter polish type',
        options: [
            { label: 'Normal', value: 'normal' },
            { label: 'Military', value: 'military' },
            { label: 'Parade', value: 'parade' },
        ]
    },  
    {
        label: 'Shine Level',
        name: 'shineLevel',
        type: 'select',
        required: true,
        placeholder: 'Enter shine level',
        options: [
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
        ]
    },
    {
        label: 'Instructions',
        name: 'instructions',
        type: 'text',
        required: false,
        placeholder: 'Enter instructions',
    },
    {
        label: 'Contact Name',
        name: 'contactName',
        type: 'text',
        required: true,
        placeholder: 'Enter contact name',
    },
    {
        label: 'Contact Email',
        name: 'contactEmail',
        type: 'email',
        required: true,
        placeholder: 'Enter contact email',
    },
    {
        label: 'Contact Phone',
        name: 'contactPhone',
        type: 'text',
        required: true,
        placeholder: 'Enter contact phone',
    },
    {
        label: 'Contact Address',
        name: 'contactAddress',
        type: 'text',
        required: true,
        placeholder: 'Enter contact address',
    }
]