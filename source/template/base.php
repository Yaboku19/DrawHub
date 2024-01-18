<?php
/*
$homeBg = "bg-light";
$homeLink = "link-primary";
$uniBg = "bg-light";
$uniLink = "link-primary";
$notifyBg = "bg-light";
$notifyLink = "link-primary";
if ($templateParams["homepage"] === "link-secondary") {
    $homeBg = "bg-primary";
    $homeLink = "link-light";
}
if ($templateParams["uni-list"] === "link-secondary") {
    $uniBg = "bg-primary";
    $uniLink = "link-light";
}
if ($templateParams["notifications"] === "link-secondary") {
    $notifyBg = "bg-primary";
    $notifyLink = "link-light";
}
*/
?>

<!DOCTYPE html>
<html lang="it">

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <title><?php echo $templateParams["title"]?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
    <header>
    <div class="container p-0 m-0">
    <div class="d-sm-block d-md-none fixed-top z-index-master w-100 bg-white bg-opacity-100 p-0 m-0">
        <button class="navbar-toggler fs-1 my-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <i class="bi bi-list text-dark"></i>
        </button>
        <hr class="p-0 m-0">
    </div>
    </div>
    </header>
    <main>
        <!--<div class="row vh-100">
            <div class="col-2 border fluid bg-light sticky-top">
                <div class="mt-5">
                    <img class="img-fluid" src="../img/drawhub.png" alt="">
                </div>
                <nav class="navbar">
                    <div class="w-100">
                        <ul class="navbar-nav flex-column m-3 p-3">
                            <li class="nav-item m-1">
                                <a class="nav-link w-100" href="../php/showHomepage.php"><img src="../img/icons/home.svg" alt=""> Home</a>
                            </li>
                            <li class="nav-item m-1">
                                <a class="nav-link" href="../php/profile.php?username=<?php echo $_SESSION["username"];?>"><img src="../img/icons/account.svg" alt=""> Account</a>
                            </li>
                            <li class="nav-item m-1">
                                <a class="nav-link" href="../php/showNotification.php"><img src="../img/icons/notification.svg" alt=""> Notifiche</a>
                            </li>
                            <li class="nav-item m-1">
                                <a class="nav-link" href="../php/showSearch.php"><img src="../img/icons/search.svg" alt=""> Cerca</a>
                            </li>
                            <li class="nav-item m-1">
                                <a class="nav-link" href="../php/showAddPost.php"><img src="../img/icons/addPost.svg" alt=""> Nuovo Post</a>
                            </li>
                            <li class="nav-item m-1">
                                <a class="nav-link" href="../php/showExplore.php"><img src="../img/icons/explore.svg" alt=""> Esplora</a>
                            </li>
                            <li class="nav-item m-1">
                                <a class="nav-link" href="../php/showSettings.php"> <img src="../img/icons/settings.svg" alt=""> Impostazioni</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            
            <div class="col-9">
                <div class="sticky-top mt-3 ml-3">
                <h2 class="pt-3 px-3">Home</h2>
                <hr>    
                </div>
                <div class="container-fluid">
                    <section>
                        <div class="d-flex justify-content-center align-middle bg-secondary">

                        </div>
                    </section>
                </div>
                
            </div>
        </div>-->
    <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <label for="searchInput" class="modal-title" id="searchModalLabel">Ricerca:</label>
                <input type="search" class="form-control" id="searchInput" placeholder="Cerca utente">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container searchResult p-3">
                    <p>Utilizza la barra di ricerca per cercare utenti in base al loro nome, cognome e/o username.</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
            </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="commentModal" tabindex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <label for="commentInput" class="modal-title" id="commentModalLabel">Ricerca:</label>
                <input type="comment" class="form-control" id="commentInput" placeholder="Cerca utente">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container commentResult p-3" id = "prova">
                    <p>Post</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
            </div>
            </div>
        </div>
    </div>
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100 sticky-top">
        <div class="mt-5">
            <img class="img-fluid mb-3" src="../img/drawhub.png" alt="">
            <hr>
        </div>
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
            <li class="nav-item">
                <a href="../php/showHomepage.php" class="nav-link px-0 text-dark">
                    <i class="fs-3 bi-house-fill"></i> <span class="fs-3 ms-2 d-sm-inline">Home</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="../php/profile.php?username=<?php echo $_SESSION["username"];?>" class="nav-link px-0 text-dark">
                    <i class="fs-3 bi-person-circle"></i> <span class="fs-3 ms-2 d-sm-inline">Account</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="../php/showNotification.php" class="nav-link px-0 text-dark">
                    <i class="fs-3 bi-bell-fill"></i> <span class="fs-3 ms-2 d-sm-inline">Notifiche</span>
                </a>
            </li>
            <li class="nav-item">
                <a data-bs-toggle="modal" data-bs-target="#searchModal" class="nav-link px-0 text-dark">
                    <i class="fs-3 bi-search"></i> <span class="fs-3 ms-2 d-sm-inline">Cerca</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="../php/showAddPost.php" class="nav-link px-0 text-dark">
                    <i class="fs-3 bi-plus-circle-fill"></i> <span class="fs-3 ms-2 d-sm-inline">Nuovo post</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="../php/showExplore.php" class="nav-link px-0 text-dark">
                    <i class="fs-3 bi-compass-fill"></i> <span class="fs-3 ms-2 d-sm-inline">Esplora</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="../php/showSettings.php" class="nav-link px-0 text-dark">
                    <i class="fs-3 bi-gear-fill"></i> <span class="fs-3 ms-2 d-sm-inline">Impostazioni</span>
                </a>
            </li>  
        </ul>
    </div>
</div>
<div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto d-md-block d-none col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary bg-opacity-10 ">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100 sticky-top">
                <div class="mt-5">
                    <img class="img-fluid mb-3" src="../img/drawhub.png" alt="">
                    <hr>
                </div>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                    <li class="nav-item">
                        <a href="../php/showHomepage.php" class="nav-link px-0 text-dark">
                            <i class="fs-4 bi-house-fill"></i> <span class="fs-4 ms-2 d-none d-sm-inline">Home</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="../php/profile.php?username=<?php echo $_SESSION["username"];?>" class="nav-link px-0 text-dark">
                            <i class="fs-4 bi-person-circle"></i> <span class="fs-4 ms-2 d-none d-sm-inline">Account</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="../php/showNotification.php" class="nav-link px-0 text-dark">
                            <i class="fs-4 bi-bell-fill"></i> <span class="fs-4 ms-2 d-none d-sm-inline">Notifiche</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a data-bs-toggle="modal" data-bs-target="#searchModal" class="nav-link px-0 text-dark">
                            <i class="fs-4 bi-search"></i> <span class="fs-4 ms-2 d-none d-sm-inline">Cerca</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="../php/showAddPost.php" class="nav-link px-0 text-dark">
                            <i class="fs-4 bi-plus-circle-fill"></i> <span class="fs-4 ms-2 d-none d-sm-inline">Nuovo post</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="../php/showExplore.php" class="nav-link px-0 text-dark">
                            <i class="fs-4 bi-compass-fill"></i> <span class="fs-4 ms-2 d-none d-sm-inline">Esplora</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="../php/showSettings.php" class="nav-link px-0 text-dark">
                            <i class="fs-4 bi-gear-fill"></i> <span class="fs-4 ms-2 d-none d-sm-inline">Impostazioni</span>
                        </a>
                    </li>
                    
                </ul>
            </div>
        </div>
            <div id="dinamic" class="col-md-8 offset-md-1 px-3 py-3">
                <main>
                <?php
                if (isset($templateParams["name"])) {
                    require($templateParams["name"]);
                }
                if (isset($templateParams["js"])) :
                    foreach($templateParams["js"] as $script):
                ?>
                <script src="<?php echo $script; ?>"></script>
                <?php
                        endforeach;
                    endif;
                ?>
                </main>
            </div>
        </div>
    </div>
</div>
    </main>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous">
</script>
<script src="../js/constants.js"></script>
<script src="../js/search.js"></script>

</html>