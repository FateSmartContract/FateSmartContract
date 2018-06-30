<template>
    <div class="container">
        <div class="jumbotron">
            <h1 class="display-4">Fate/Smart Contract</h1>
            <p class="lead">
                將抽卡結果儲存在區塊鏈上，讓任何人可以驗證抽卡機率。使用 Fate/Grand Order 的抽卡機制作為示範。<br/>
                (註：目前區塊鏈是使用 Ethereum Rinkeby Testnet)
            </p>
            <hr class="my-4">
            <router-link class="btn btn-primary btn-lg mt-1" to="/dashboard"><i class="fas fa-play"></i> Play</router-link>
            <router-link class="btn btn-info btn-lg mt-1" to="/q-and-a"><i class="far fa-question-circle"></i> Q & A</router-link>
            <router-link class="btn btn-info btn-lg mt-1" to="/how-it-works"><i class="fas fa-cubes"></i> How it works</router-link>
        </div>
        <p>備註：</p>
        <ul>
            <li class="danger-text">使用此網站是免費的，絕對不會花到一毛錢，也不需要購買任何虛擬貨幣(因為在Testnet上，上面的貨幣是免費的)</li>
            <li>FGO角色與裡裝的中文資料來自：<a href="https://kazemai.github.io/fgo-vz/">Fate/GO 茹西教王的理想鄉</a></li>
            <li>有關 FGO 的相關圖片，其版權屬於原公司所有</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Index'
    }
</script>
