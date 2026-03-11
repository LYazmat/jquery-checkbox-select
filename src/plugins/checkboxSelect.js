import $ from 'jquery';

(function($) {
    $.fn.checkboxSelect = function(options) {
        const settings = $.extend({
            placeholder: 'Select options',
            selectAllText: 'Select All',
            deselectAllText: 'Deselect All',
            noResultsText: 'No results found',
            onSelect: function() {}
        }, options);

        return this.each(function() {
            const $originalSelect = $(this);
            if ($originalSelect.data('checkbox-select-initialized')) return;
            
            $originalSelect.hide();
            $originalSelect.data('checkbox-select-initialized', true);

            // Create container
            const $container = $('<div class="checkbox-select-container"></div>');
            
            // Create list structure (formerly dropdown)
            const $list = $(`
                <div class="checkbox-select-list">
                    <div class="checkbox-select-search-wrapper">
                        <input type="text" class="checkbox-select-search" placeholder="Search...">
                    </div>
                    <div class="checkbox-select-options"></div>
                    <div class="checkbox-select-no-results">${settings.noResultsText}</div>
                    <div class="checkbox-select-actions">
                        <button type="button" class="checkbox-select-btn select-all">${settings.selectAllText}</button>
                        <button type="button" class="checkbox-select-btn deselect-all">${settings.deselectAllText}</button>
                    </div>
                </div>
            `);

            $container.append($list);
            $originalSelect.after($container);

            const $optionsContainer = $list.find('.checkbox-select-options');
            const $search = $list.find('.checkbox-select-search');

            // Populate options
            function populateOptions() {
                $optionsContainer.empty();
                $originalSelect.find('option').each(function() {
                    const $opt = $(this);
                    const val = $opt.val();
                    const text = $opt.text();
                    const isChecked = $opt.prop('selected');

                    const $optionRow = $(`
                        <div class="checkbox-select-option ${isChecked ? 'selected' : ''}" data-value="${val}">
                            <input type="checkbox" ${isChecked ? 'checked' : ''}>
                            <label>${text}</label>
                        </div>
                    `);

                    $optionsContainer.append($optionRow);
                });
                updateDisplay();
            }

            function updateDisplay() {
                // No display to update in static mode, but we keep the function for compatibility
            }

            populateOptions();

            // Option click
            $optionsContainer.on('click', '.checkbox-select-option', function() {
                const $row = $(this);
                const $cb = $row.find('input');
                const val = $row.data('value');
                
                const isChecked = !$cb.prop('checked');
                $cb.prop('checked', isChecked);
                $row.toggleClass('selected', isChecked);
                
                $originalSelect.find(`option[value="${val}"]`).prop('selected', isChecked);
                $originalSelect.trigger('change');
                settings.onSelect($originalSelect.val());
            });

            // Prevent checkbox click from double triggering
            $optionsContainer.on('click', 'input', function(e) {
                e.stopPropagation();
                const $cb = $(this);
                const $row = $cb.closest('.checkbox-select-option');
                const val = $row.data('value');
                const isChecked = $cb.prop('checked');
                
                $row.toggleClass('selected', isChecked);
                $originalSelect.find(`option[value="${val}"]`).prop('selected', isChecked);
                $originalSelect.trigger('change');
                settings.onSelect($originalSelect.val());
            });

            // Search
            $search.on('input', function() {
                const query = $(this).val().toLowerCase();
                let hasResults = false;

                $optionsContainer.find('.checkbox-select-option').each(function() {
                    const text = $(this).find('label').text().toLowerCase();
                    if (text.indexOf(query) > -1) {
                        $(this).show();
                        hasResults = true;
                    } else {
                        $(this).hide();
                    }
                });

                if (hasResults) {
                    $list.find('.checkbox-select-no-results').hide();
                } else {
                    $list.find('.checkbox-select-no-results').show();
                }
            });

            // Select All
            $list.find('.select-all').on('click', function() {
                $optionsContainer.find('.checkbox-select-option:visible').each(function() {
                    const $row = $(this);
                    const val = $row.data('value');
                    $row.find('input').prop('checked', true);
                    $row.addClass('selected');
                    $originalSelect.find(`option[value="${val}"]`).prop('selected', true);
                });
                $originalSelect.trigger('change');
                settings.onSelect($originalSelect.val());
            });

            // Deselect All
            $list.find('.deselect-all').on('click', function() {
                $optionsContainer.find('.checkbox-select-option:visible').each(function() {
                    const $row = $(this);
                    const val = $row.data('value');
                    $row.find('input').prop('checked', false);
                    $row.removeClass('selected');
                    $originalSelect.find(`option[value="${val}"]`).prop('selected', false);
                });
                $originalSelect.trigger('change');
                settings.onSelect($originalSelect.val());
            });
        });
    };
})( $ );
