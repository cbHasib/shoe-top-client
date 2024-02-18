export const UPDATE_SERVICE_REQUEST_INPUTS = [
    {
        label: 'Status',
        name: 'status',
        type: 'select',
        required: true, 
        placeholder: 'Choose status',
        options: [
            { label: 'Pending', value: 'pending' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Completed', value: 'completed' },
            { label: 'Cancelled', value: 'cancelled' },
            { label: 'Rejected', value: 'rejected' },
            { label: 'Delivered', value: 'delivered' },
        ]
    },  
    
]