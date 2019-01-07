<template>
    <div class="container">
        <div class="jumbotron">
            <h1 class="display-4">Fate/Smart Contract</h1>
            <p class="lead">
                用區塊鏈儲存抽卡結果<br/>
                讓任何人可以驗證抽卡機率。使用 Fate/Grand Order 的抽卡機制作為示範。<br/>
                （註：目前區塊鏈是使用 Ethereum Rinkeby Testnet）
            </p>
            <router-link class="btn btn-primary btn-lg mt-1" to="/dashboard"><i class="fas fa-play"></i> Play</router-link>
            <router-link class="btn btn-info btn-lg mt-1" to="/q-and-a"><i class="far fa-question-circle"></i> Q & A</router-link>
            <router-link class="btn btn-info btn-lg mt-1" to="/how-it-works"><i class="fas fa-cubes"></i> How it works</router-link>
        </div>
        <p>備註：</p>
        <ul>
            <li><span class="text-danger">此網站是免費的，絕對不會花到一毛錢，也不需要購買任何虛擬貨幣（因為在Testnet上，上面的貨幣是免費的）</span></li>
            <li>FGO角色與裡裝的中文資料來自：<a href="https://kazemai.github.io/fgo-vz/">Fate/GO 茹西教王的理想鄉</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Index'
    }
</script>
