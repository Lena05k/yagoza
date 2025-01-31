export interface Ingredient {
    name: string;
    currentAmount: number;
    totalAmount: number;
    unit: string;
}

export interface Subcategory {
    id: string;
    img: string;
    name: string;
    description?: Ingredient[];
}

export interface Category {
    icon: string;
    name: string;
    description: string;
    subcategories: Subcategory[];
}

export const categoriesData: Record<string, Category> = {
    coffee: {
        icon: require("../assets/icons/coffee.png"),
        name: "Кофе",
        description: "Все в 'Sinka Kafe'",
        subcategories: [
            { id: "americano", img: require("../assets/images/coffe/image9.png"), name: "Американо", description: [{ name: "Кофе 'ARY'", currentAmount: 300, totalAmount: 1000, unit: "мл" }] },
            { id: "cappuccino", img: require("../assets/images/coffe/image8.png"), name: "Капучино", description: [
                    { name: "Сироп", currentAmount: 500, totalAmount: 2000, unit: "мл" },
                    { name: "Взбитое молоко", currentAmount: 10, totalAmount: 12, unit: "л" }
                ]},
            { id: "latte", img: require("../assets/images/coffe/image8.png"), name: "Латте", description: [
                    { name: "Сироп", currentAmount: 400, totalAmount: 1500, unit: "мл" },
                    { name: "Взбитое молоко", currentAmount: 5, totalAmount: 10, unit: "л" }
                ]},
            { id: "espresso", img: require("../assets/images/coffe/image8.png"), name: "Эспрессо", description: [{ name: "Классический эспрессо", currentAmount: 100, totalAmount: 500, unit: "мл" }] },
        ],
    },

    bakery: {
        icon: require("../assets/icons/bakery.png"),
        name: "Выпечка",
        description: "Среди всех заведений",
        subcategories: [
            { id: "croissant", img: require("../assets/images/coffe/image9.png"), name: "Круассан сливочный", description: [{ name: "Со сливочным кремом", currentAmount: 50, totalAmount: 200, unit: "шт" }] },
            { id: "chocolate", img: require("../assets/images/coffe/image9.png"), name: "Круассан с шоколадом", description: [{ name: "С начинкой из шоколада", currentAmount: 40, totalAmount: 180, unit: "шт" }] },
            { id: "danish", img: require("../assets/images/coffe/image9.png"), name: "Датская булочка", description: [{ name: "С вишневым джемом", currentAmount: 30, totalAmount: 100, unit: "шт" }] },
            { id: "muffin", img: require("../assets/images/coffe/image9.png"), name: "Маффин", description: [{ name: "С черникой", currentAmount: 20, totalAmount: 90, unit: "шт" }] }
        ]
    },
    syrups: {
        icon: require("../assets/icons/syrups.png"),
        name: "Сиропы",
        description: "Среди всех заведений",
        subcategories: [
            { id: "vanilla", img: require("../assets/images/coffe/image9.png"), name: "Ванильный сироп", description: [{ name: "Herbarista Bourbon Vanilla", currentAmount: 600, totalAmount: 2500, unit: "мл" }] },
            { id: "caramel", img: require("../assets/images/coffe/image9.png"), name: "Карамельный сироп", description: [{ name: "Herbarista Bourbon Caramel", currentAmount: 500, totalAmount: 2200, unit: "мл" }] },
            { id: "hazelnut", img: require("../assets/images/coffe/image9.png"), name: "Ореховый сироп", description: [{ name: "Herbarista Hazelnut", currentAmount: 450, totalAmount: 2000, unit: "мл" }] },
            { id: "chocolate", img: require("../assets/images/coffe/image9.png"), name: "Шоколадный сироп", description: [{ name: "Herbarista Chocolate", currentAmount: 700, totalAmount: 2800, unit: "мл" }] }
        ]
    },
    viewAll: {
        icon: "",
        name: "Смотреть все",
        description: "",
        subcategories: []
    }
};
