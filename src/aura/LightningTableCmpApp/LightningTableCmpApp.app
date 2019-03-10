<aura:application description="Lightning Pagination" access="GLOBAL" extends="force:slds" implements="flexipage:availableForAllPageTypes">
    <div class="slds">
        <!-- Header component -->
        <c:PaginationHeader />

        <!-- Table body component -->
        <c:LightningTableComponent />

        <!-- Footer component -->
        <c:PageFooter />
    </div>
</aura:application>