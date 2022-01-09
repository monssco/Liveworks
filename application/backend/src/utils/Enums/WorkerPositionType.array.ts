interface WorkerPositionTypeInterface {
    name: string,
    rank: number,
    display: string,
    color: string
}

export const WorkerPositionTypeArray: WorkerPositionTypeInterface[] = [
    {
        name: "manager",
        rank: 1,
        display: "Manager",
        color: "#1F1F27"
    },
    {
        name: "bartender",
        rank: 2,
        display: "Bartender",
        color: "#14A182"
    },
    {
        name: "server",
        rank: 3,
        display: "Server",
        color: "#007AFF"
    },
    {
        name: "bar_support",
        rank: 4,
        display: "Bar Support",
        color: "#FFD851"
    },
    {
        name: "host_hostess",
        rank: 5,
        display: "Host/Hostess",
        color: "#9560D8"
    },
    {
        name: "security",
        rank: 7,
        display: "Security",
        color: "#B93555"
    },
    {
        name: "chef",
        rank: 8,
        display: "Chef",
        color: "#0F4061"
    },
    {
        name: "kitchen_support",
        rank: 9,
        display: "Kitchen Support",
        color: "#FC6439"
    },
    {
        name: "bussers",
        rank: 10,
        display: "Bussers",
        color: "#AAAAAA"
    }
]