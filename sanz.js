    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

(function() {
    // Check if SweetAlert2 (Swal) is available, as the script relies on it.
    if (typeof Swal === 'undefined') {
        console.error('Anti-Piracy Protection requires SweetAlert2 (Swal). Please ensure it is loaded.');
        return;
    }

    const BLOCK_MESSAGE = "ไม่ได้รับอนุญาตให้ดูซอร์สโค้ด (Source Code Access Denied)";

    function handleBlock(message = BLOCK_MESSAGE) {
        Swal.fire({
            title: '🚫 Access Denied',
            text: message,
            icon: 'warning',
            confirmButtonText: 'Got It',
            customClass: {
                container: 'z-50',
            }
        });
        return false;
    }

    function disableSelection(target) {
        if (typeof target.onselectstart !== 'undefined') {
            target.onselectstart = function() { return false; };
        }
        else if (typeof target.style.MozUserSelect !== 'undefined') {
            target.style.MozUserSelect = 'none';
        }
        else {
            target.onmousedown = function() { return false; };
        }
        target.style.cursor = 'default';
    }

    function initAntiPiracyProtection() {
        const body = document.body;
        
        // 1. Disable text selection on the entire body
        disableSelection(body);

        // 2. Disable right-click and context menu
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            handleBlock();
            return false;
        });

        // 3. Disable specific keyboard shortcuts
        document.addEventListener('keydown', function (e) {
            const isCtrl = e.ctrlKey || e.metaKey;

            // F12 or Cmd+Option+I (DevTools)
            if (e.key === 'F12' || (isCtrl && e.shiftKey && e.key === 'I')) {
                e.preventDefault();
                handleBlock();
                return false;
            }

            // Ctrl/Cmd + U (View Source)
            if (isCtrl && e.key === 'u') {
                e.preventDefault();
                handleBlock();
                return false;
            }
            
            // Ctrl/Cmd + Shift + J or C (Console/Inspect Element)
            if (isCtrl && e.shiftKey && (e.key === 'J' || e.key === 'C')) {
                e.preventDefault();
                handleBlock();
                return false;
            }

            // Disabled Ctrl/Cmd combinations: A, C, S, X
            const forbiddenKeys = ['a', 'c', 's', 'x'];
            if (isCtrl && forbiddenKeys.includes(e.key.toLowerCase())) {
                e.preventDefault();
                handleBlock(`Key combination ${e.key.toUpperCase()} has been disabled.`);
                return false;
            }

            return true;
        });
    }

    // Start the protection features when the DOM structure is fully loaded
    document.addEventListener('DOMContentLoaded', initAntiPiracyProtection);
})();
