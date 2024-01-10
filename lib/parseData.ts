import { allAuthors } from "@/.contentlayer/generated"
export function parseData() {
    const people = []
    for(let i=0; i<allAuthors.length; i++){
        let curr_user_obj = {
            id: -1,
            name: '',
            designation: '',
            image: '',
            url: ''
        }
        const curr_user = allAuthors[i]

        curr_user_obj.id = i
        curr_user_obj.name = curr_user.name
        curr_user_obj.designation = curr_user?.description ?? ""
        curr_user_obj.image = curr_user.avatar
        curr_user_obj.url  = curr_user.twitter.url
        
       

        people.push(curr_user_obj)
    }
    return people
}