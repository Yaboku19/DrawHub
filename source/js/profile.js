getParameter = (key) => {
    
    address = window.location.search
    
    parameterList = new URLSearchParams(address)
    
    return parameterList.get(key)
}
function selectPage() {
    return "Profile";
}

function selectUsername() {
    return getParameter("username");
}
