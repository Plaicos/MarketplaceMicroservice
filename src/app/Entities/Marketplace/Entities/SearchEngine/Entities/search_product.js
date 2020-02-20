module.exports = ({ product }) => {
    return new Promise((resolve, reject) => {

        if (!product) {
            resolve(null)
            return
        }
        else if (typeof product !== "object") {
            reject("Product filter must be an object")
            return
        }
        else if (Object.keys(product).length > 0) {
            let { name, inci_name, functions, origin, manufacturer, made_in, shelf_life, lead_time, availability, free_from, user, application } = product
            let filter = {}

            if (name) {
                if (typeof name !== "string" || name.length < 1) {
                    return reject("Name filter is invalid")
                }
                filter.name = name
            }
            if (inci_name) {
                if (typeof inci_name !== "string" || inci_name.length < 1) {
                    return reject("Inci_name filter is invalid")
                }
                filter.inci_name = inci_name
            }
            if (functions) {
                if (typeof functions !== "string" || functions.length < 1) {
                    return reject("Functions filter is invalid")
                }
                filter.functions = functions
            }
            if (origin) {
                if (typeof origin !== "string" || origin.length < 1) {
                    return reject("Origin filter is invalid")
                }
                filter.origin = origin
            }
            if (manufacturer) {
                if (typeof manufacturer !== "string" || manufacturer.length < 1) {
                    return reject("Manufacturer filter is invalid")
                }
                filter.manufacturer = manufacturer
            }
            if (made_in) {
                if (typeof made_in !== "string" || made_in.length < 1) {
                    return reject("Made in filter is invalid")
                }
                filter.made_in = made_in
            }
            if (shelf_life) {
                if (isNaN(parseInt(shelf_life, 10))) {
                    return reject("Shelf life filter is invalid")
                }
                filter.shelf_life = shelf_life
            }
            if (lead_time) {
                if (isNaN(parseInt(lead_time, 10))) {
                    return reject("Lead time filter is invalid")
                }
                filter.lead_time = lead_time
            }
            if (availability) {
                if (typeof availability !== "string" || availability.length < 1) {
                    return reject("Availability filter is invalid")
                }
                filter.availability = availability
            }
            if (free_from) {
                if (typeof free_from !== "string" || free_from.length < 1) {
                    return reject("Free from filter is invalid")
                }
                filter.free_from = free_from
            }
            if (application) {
                if (typeof application !== "string" || application.length < 1) {
                    return reject("Application filter is invalid")
                }
                filter.application = application
            }

            resolve(filter)
        }
        else {
            resolve(null)
        }
    });
}