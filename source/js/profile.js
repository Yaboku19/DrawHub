getParameter = (key) => {
    
    address = window.location.search
    
    parameterList = new URLSearchParams(address)
    
    return parameterList.get(key)
}
let postsView = "Profile";
let usernameprofileprova = getParameter("username");