module.exports = ({ store }) => {
	return {
		async add(item) {
			item.id = Date.now();
			await store.redis.hset("ITEM", item.id,  JSON.stringify(item));
			return item;
		},
		async get(item) {
			const data = await store.redis.hget("ITEM", item.id);
			return data && JSON.parse(data);
		},
		async list() {
			const data = await store.redis.hgetall("ITEM");
			return Object.values(data || {}).map(JSON.parse);
		},
		async remove(id) {
			const item = await this.get({ id });
			await ctx.store.redis.hdel("ITEM", item.id);
			return item;
		}
	};
};
