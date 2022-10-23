export interface Post {
	_id: string;
	_createdAt: string;
	publishedAt: string;
	title: string;
	author: {
		name: string;
		image: string;
	};
	comments: Comment[];
	description: string;
	mainImage: {
		asset: {
			url: string;
		};
	};
	slug: {
		current: string;
	};
	body: [object];
}

export interface Comment {
	apprved: boolean;
	comment: string;
	email: string;
	name: string;
	post: {
		_type: string;
		_ref: string;
	};
	_createdAt: string;
	_id: string;
	_rev: string;
	_type: string;
	_updatedAt: string;
}
