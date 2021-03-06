module.exports = {
    user: require("./post_user.js"),
    title: require("./post_title.js"),
    limited: require("./post_limited.js"),
    expires: require("./post_expires.js"),
    type: require("./post_type.js"),
    location: require("./post_location"),
    limit: require("./search_limit"),
    offset : require("./search_offset"),
    product: require("./post_product"),
    description: require("./post_description"),
    key_words: require("./search_key_words"),
    // types
    raw_material: require("./types/raw_material/raw_material_entities")
}