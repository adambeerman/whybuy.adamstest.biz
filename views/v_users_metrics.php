
<div data-role = "fieldcontain">
    <?php if(isset($metrics)): ?>
        <h2>Net Profit:</h2>
        <h3><?=$metrics['metric_profit'];?></h3>

        <h2>Internal Rate of Return</h2>
        <h3><?=$metrics['metric_irr']*100;?>%</h3>

    <?php endif; ?>
</div>

