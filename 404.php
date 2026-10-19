<?php
/**
 * GUJARAT GRAMIN BANK - 404 ERROR PAGE
 */
http_response_code(404);
include __DIR__ . '/includes/header.php';
?>

<main id="main-content">
  <section class="section-padding py-5 my-5 text-center">
    <div class="container-custom" style="max-width: 680px;">
      <div class="mb-4">
        <span class="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill fw-bold">
          <i class="bi bi-exclamation-triangle-fill me-1"></i> Error 404
        </span>
      </div>
      <h1 class="display-3 fw-bold text-navy mb-3" style="color: var(--ggb-navy);">Page Not Found</h1>
      <p class="lead text-muted mb-4">
        The page or banking service you are looking for might have been moved, renamed, or is temporarily unavailable.
      </p>

      <div class="p-4 bg-white border rounded-4 shadow-sm mb-4">
        <h4 class="fw-bold mb-3" style="color: var(--ggb-navy);">Looking for something specific?</h4>
        <div class="d-flex flex-wrap justify-content-center gap-2">
          <a href="./#products-deposits" class="btn btn-sm btn-outline-primary rounded-pill">Savings & Term Deposits</a>
          <a href="./#products-loans" class="btn btn-sm btn-outline-primary rounded-pill">Home & Gold Loans</a>
          <a href="./#products-agri" class="btn btn-sm btn-outline-primary rounded-pill">Kisan Credit Card</a>
          <a href="./#calculator" class="btn btn-sm btn-outline-primary rounded-pill">Loan EMI Calculator</a>
          <a href="./#branches" class="btn btn-sm btn-outline-primary rounded-pill">Branch Locator</a>
        </div>
      </div>

      <div class="d-flex justify-content-center gap-3">
        <a href="./" class="btn-ggb-primary">
          <i class="bi bi-house-door-fill"></i> Return to Homepage
        </a>
        <a href="tel:02652361210" class="btn-ggb-outline">
          <i class="bi bi-telephone-fill"></i> Call 0265-2361210
        </a>
      </div>
    </div>
  </section>
</main>

<?php
include __DIR__ . '/includes/footer.php';
?>
