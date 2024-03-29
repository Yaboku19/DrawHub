<!DOCTYPE html>
<html lang="it">

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"/>
    <title><?php echo $templateParams["title"]?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/style.css"/>
</head>
<body>
    <header>
        <div class="d-sm-block d-md-none container p-3">
            <div class=" fixed-top z-index-master w-100 bg-white bg-opacity-100 p-0 m-0">
                <div class="row">
                    <div class="col text-center px-0 mx-0">
                            <img src="../img/drawhub.png" class="pt-2 ms-5 me-0 img-fluid" alt="" width="120"/>
                    </div>
                    <div class="col-auto pe-3 ps-0 me-1">
                        <button class="navbar-toggler fs-1 mx-0 my-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                            <em class="bi bi-list text-dark"></em>
                        </button>
                    </div>   
                    <hr class="p-0 m-0"/>
                </div>
            </div>
        </div>
    </header>
    <main>
        <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <label for="searchInput" class="modal-title" id="searchModalLabel">Ricerca:</label>
                    <input type="search" class="form-control" id="searchInput" placeholder="Cerca utente"/>
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
        <div class="modal fade modal-lg" id="commentModal" tabindex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header border border-dark">
                        <p>Commenti:</p>
                        <button type="button" class="btn-close justify-content-end" data-bs-dismiss="modal" aria-label="Close"></button>
                        <p id="idPost" class="d-none"></p>
                    </div>
                    <div class="modal-body text-wrap comment-body border border-dark">
                    </div>
                    <div class="modal-footer border border-dark">
                        <label for="commentInput" class="d-none">a</label>
                        <input type="text" class="form-control" id="commentInput" placeholder="Scrivi un commento"/>
                        <button data-toggle="button" class="btn btn-outline-primary" id="postaCommento">Posta</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100 sticky-top">
                <button type="button" class="btn-close btn-close-dark align-self-end" data-bs-dismiss="offcanvas" aria-label="Chiudi"></button>
                <div class="mt-5">
                    <img class="img-fluid mb-3" src="../img/drawhub.png" alt="immagine del logo"/>
                    <hr/>
                </div>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                    <li class="nav-item">
                        <a href="../php/showHomepage.php" class="nav-link px-0 text-dark">
                            <em class="fs-3 bi-house-fill"></em> <span class="fs-3 ms-2 d-sm-inline">Home</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="../php/profile.php?username=<?php echo $_SESSION["username"];?>" class="nav-link px-0 text-dark">
                            <em class="fs-3 bi-person-circle"></em> <span class="fs-3 ms-2 d-sm-inline">Account</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="../php/showNotification.php" class="nav-link px-0 text-dark position-relative">
                            <em class="fs-3 bi-bell-fill"></em> <span class="fs-3 ms-2 d-sm-inline">Notifiche</span>
                            <span class="position-absolute top-0 start-100  badge rounded-pill bg-danger fs-7" id="offCanvasNotificationSpan"></span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a data-bs-toggle="modal" data-bs-target="#searchModal" class="nav-link px-0 text-dark" href="#">
                            <em class="fs-3 bi-search"></em> <span class="fs-3 ms-2 d-sm-inline">Cerca</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="../php/showAddPost.php" class="nav-link px-0 text-dark">
                            <em class="fs-3 bi-plus-circle-fill"></em> <span class="fs-3 ms-2 d-sm-inline">Nuovo post</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="../php/showExplore.php" class="nav-link px-0 text-dark">
                            <em class="fs-3 bi-compass-fill"></em> <span class="fs-3 ms-2 d-sm-inline">Esplora</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="../php/showSettings.php" class="nav-link px-0 text-dark">
                            <em class="fs-3 bi-gear-fill"></em> <span class="fs-3 ms-2 d-sm-inline">Impostazioni</span>
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
                            <img class="img-fluid mb-3" src="../img/drawhub.png" alt=""/>
                            <hr/>
                        </div>
                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                            <li class="nav-item">
                                <a href="../php/showHomepage.php" class="nav-link px-0 text-dark d-flex flex-nowrap">
                                    <em class="fs-4 bi-house-fill"></em> <span class="fs-4 ms-2 d-none d-sm-inline">Home</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="../php/profile.php?username=<?php echo $_SESSION["username"];?>" class="nav-link px-0 text-dark d-flex flex-nowrap">
                                    <em class="fs-4 bi-person-circle"></em> <span class="fs-4 ms-2 d-none d-sm-inline">Account</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="../php/showNotification.php" class="nav-link px-0 text-dark d-flex flex-nowrap position-relative">
                                    <em class="fs-4 bi-bell-fill"></em> <span class="fs-4 ms-2 d-none d-sm-inline me-0">Notifiche</span>
                                    <span class="position-absolute top-0 start-100  badge rounded-pill bg-danger fs-7" id="baseNotificationSpan"></span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a data-bs-toggle="modal" data-bs-target="#searchModal" class="nav-link px-0 text-dark d-flex flex-nowrap" href="#">
                                    <em class="fs-4 bi-search"></em> <span class="fs-4 ms-2 d-none d-sm-inline">Cerca</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="../php/showAddPost.php" class="nav-link px-0 text-dark d-flex flex-nowrap">
                                    <em class="fs-4 bi-plus-circle-fill"></em> <span class="fs-4 ms-2 d-none d-sm-inline">Nuovo post</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="../php/showExplore.php" class="nav-link px-0 text-dark d-flex flex-nowrap">
                                    <em class="fs-4 bi-compass-fill"></em> <span class="fs-4 ms-2 d-none d-sm-inline">Esplora</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="../php/showSettings.php" class="nav-link px-0 text-dark d-flex flex-nowrap">
                                    <em class="fs-4 bi-gear-fill"></em> <span class="fs-4 ms-2 d-none d-sm-inline">Impostazioni</span>
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
                <div id="dinamic" class="col-md-8 offset-md-1 px-3 py-3">
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
                </div>
            </div>
        </div>
    </main>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
<script src="../js/search.js"></script>

</html>