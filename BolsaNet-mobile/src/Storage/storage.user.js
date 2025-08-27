import AsyncStorage from "@react-native-async-storage/async-storage";

async function SaveUser(user) {
    try {
        await AsyncStorage.setItem("user",JSON.stringify(user))
    } catch (error) {
        console.log(error.toString())
    }
}
async function LoadUser() {
    try {
        const storage = await AsyncStorage.getItem("user")
        return storage ? JSON.parse(storage) : {}
    } catch (error) {
        console.log(error.toString())
    }
}

export {SaveUser,LoadUser};