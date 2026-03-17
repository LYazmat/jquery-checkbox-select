import $ from 'jquery';

(function($) {
    $.fn.checkboxSelect = function(options) {
        const settings = $.extend({
            placeholder: 'Select options',
            selectAllText: 'Select All',
            deselectAllText: 'Deselect All',
            noResultsText: 'No results found',
            selectedGroupText: 'Selected',
            availableGroupText: 'Available',
            ignoreDiacritics: true,
            showSelectAll: true,
            showDeselectAll: true,
            onSelect: function() {}
        }, options);

        return this.each(function() {
            const $originalSelect = $(this);
            if ($originalSelect.data('checkbox-select-initialized')) return;
            
            $originalSelect.hide();
            $originalSelect.data('checkbox-select-initialized', true);

            // Create container
            const $container = $('<div class="checkbox-select-container"></div>');
            
            // Create actions HTML conditionally
            let actionsHtml = '';
            if (settings.showSelectAll || settings.showDeselectAll) {
                actionsHtml = '<div class="checkbox-select-actions">';
                if (settings.showSelectAll) {
                    actionsHtml += `<button type="button" class="checkbox-select-btn select-all">${settings.selectAllText}</button>`;
                }
                if (settings.showDeselectAll) {
                    actionsHtml += `<button type="button" class="checkbox-select-btn deselect-all">${settings.deselectAllText}</button>`;
                }
                actionsHtml += '</div>';
            }

            // Create list structure
            const $list = $(`
                <div class="checkbox-select-list">
                    <div class="checkbox-select-search-wrapper">
                        <input type="text" class="checkbox-select-search" placeholder="${settings.placeholder}">
                    </div>
                    <div class="checkbox-select-options"></div>
                    <div class="checkbox-select-no-results">${settings.noResultsText}</div>
                    ${actionsHtml}
                </div>
            `);

            $container.append($list);
            $originalSelect.after($container);

            const $optionsContainer = $list.find('.checkbox-select-options');
            const $search = $list.find('.checkbox-select-search');

            const normalizeString = (str) => {
                if (!str) return '';
                return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            };

            // Populate options
            function populateOptions() {
                $optionsContainer.empty();
                
                const $options = $originalSelect.find('option');
                const $selected = $options.filter(':selected');
                const $unselected = $options.not(':selected');

                if ($selected.length > 0) {
                    $optionsContainer.append(`<div class="checkbox-select-group-header">${settings.selectedGroupText}</div>`);
                    $selected.each(function() {
                        appendOptionRow($(this), true);
                    });
                }

                if ($unselected.length > 0) {
                    if ($selected.length > 0) {
                        $optionsContainer.append(`<div class="checkbox-select-group-header">${settings.availableGroupText}</div>`);
                    }
                    $unselected.each(function() {
                        appendOptionRow($(this), false);
                    });
                }
                
                updateDisplay();
            }

            function appendOptionRow($opt, isChecked) {
                const val = $opt.val();
                const text = $opt.text();

                const $optionRow = $(`
                    <div class="checkbox-select-option ${isChecked ? 'selected' : ''}" data-value="${val}">
                        <input type="checkbox" ${isChecked ? 'checked' : ''}>
                        <label>${text}</label>
                    </div>
                `);

                $optionsContainer.append($optionRow);
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
                
                // Re-populate to move item to correct group
                const searchQuery = $search.val();
                populateOptions();
                if (searchQuery) {
                    $search.trigger('input');
                }
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

                // Re-populate to move item to correct group
                const searchQuery = $search.val();
                populateOptions();
                if (searchQuery) {
                    $search.trigger('input');
                }
            });

            // Search
            $search.on('input', function() {
                let query = $(this).val().toLowerCase();
                if (settings.ignoreDiacritics) {
                    query = normalizeString(query);
                }
                
                let hasResults = false;

                $optionsContainer.find('.checkbox-select-option').each(function() {
                    let text = $(this).find('label').text().toLowerCase();
                    if (settings.ignoreDiacritics) {
                        text = normalizeString(text);
                    }

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
                    $originalSelect.find(`option[value="${val}"]`).prop('selected', true);
                });
                $originalSelect.trigger('change');
                settings.onSelect($originalSelect.val());
                populateOptions();
            });

            // Deselect All
            $list.find('.deselect-all').on('click', function() {
                $optionsContainer.find('.checkbox-select-option:visible').each(function() {
                    const $row = $(this);
                    const val = $row.data('value');
                    $originalSelect.find(`option[value="${val}"]`).prop('selected', false);
                });
                $originalSelect.trigger('change');
                settings.onSelect($originalSelect.val());
                populateOptions();
            });
        });
    };
})( $ );
