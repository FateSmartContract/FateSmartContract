<template>
    <div class="card">
        <div class="card-body">
            <h2 class="card-title">召喚</h2>
            <div class="card">
                <div class="card-body" style="height: 70vh">
                    <div style="height: 55vh">
                        <h1 class="text-center">卡池 001</h1>
                    </div>
                    <div class="text-center">
                        <div style="display: inline-block">
                            <button type="button" class="btn btn-primary btn-lg">
                                召喚 1 回
                            </button>
                            <br/>
                            <small><i class="fas fa-cube"></i> 消耗 方塊 * 3</small>
                        </div>
                        <div style="display: inline-block; margin-left: 10vw">
                            <button type="button" class="btn btn-primary btn-lg">
                                召喚 10 回
                            </button>
                            <br/>
                            <small><i class="fas fa-cube"></i> 消耗 方塊 * 30</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Summon'
    }
</script>
