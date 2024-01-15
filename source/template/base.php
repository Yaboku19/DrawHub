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
    </header>
    <main>
        <div class="row vh-100">
            <div class="col-2 border fluid bg-light sticky-top">
                <div class="mt-5">
                    <img class="img-fluid" src="../img/drawhub.png" alt="">
                </div>
                <nav class="navbar">
                    <div class="w-100">
                        <ul class="navbar-nav flex-column m-3 p-3">
                            <li class="nav-item m-1">
                                <a class="nav-link w-100" href="#"><img src="../img/icons/home.svg" alt=""> Home</a>
                            </li>
                            <li class="nav-item m-1">
                                <a class="nav-link" href="#"><img src="../img/icons/account.svg" alt=""> Account</a>
                            </li>
                            <li class="nav-item m-1">
                                <a class="nav-link" href="#"><img src="../img/icons/notification.svg" alt=""> Notifiche</a>
                            </li>
                            <li class="nav-item m-1">
                                <a class="nav-link" href="#"><img src="../img/icons/search.svg" alt=""> Cerca</a>
                            </li>
                            <li class="nav-item m-1">
                                <a class="nav-link" href="#"><img src="../img/icons/addPost.svg" alt=""> Nuovo Post</a>
                            </li>
                            <li class="nav-item m-1">
                                <a class="nav-link" href="#"><img src="../img/icons/explore.svg" alt=""> Esplora</a>
                            </li>
                            <li class="nav-item m-1">
                                <a class="nav-link" href="#"> <img src="../img/icons/settings.svg" alt=""> Impostazioni</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="col-9">
                <p>Pagina dinamica</p>
            </div>
        </div>
    </main>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous">
</script>
<script src="../js/constants.js"></script>
<script src="../js/search.js"></script>
<?php 
    if (isset($templateParams["js"])) :
        foreach($templateParams["js"] as $script):
    ?>
<script src="<?php echo $script; ?>"></script>
<?php
        endforeach;
    endif;
    ?>

</html>