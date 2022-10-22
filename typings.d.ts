export interface Post {
	_id: string;
	title: string;
	publishedAt: string;
	description: string;
	author: {
		name: string;
		image: string;
	};
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
