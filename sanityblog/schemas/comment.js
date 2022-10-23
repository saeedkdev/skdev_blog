export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
		{
			name: 'name',
			type: 'string',
		},  
		{
			title: 'Approved',
			name: 'approved',
			type: 'boolean',
		},
		{
			name: 'email',
			type: 'string',
		},
		{
			name: 'comment',
			type: 'text',
		},
		{
			name: 'post',
			type: 'reference',
			to: [{type: 'post'}]
		},
    ],
  }
  
