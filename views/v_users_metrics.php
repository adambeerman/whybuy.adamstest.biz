
<div data-role = "fieldcontain">
    <?php if(isset($metrics)): ?>
        <h2>Net Profit:</h2>
        <h3><?=$metrics['metric_profit'];?></h3>

        <h2>Total "invested"</h2>
        <h3>$<?=round($metrics['invested']);?></h3>

        <h2>Return</h2>
        <h3><?=round(100*$metrics['metric_profit']/$metrics['invested'])/100;?>%</h3>

    <?php endif; ?>
</div>
