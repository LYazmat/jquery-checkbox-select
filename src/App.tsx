/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import './plugins/checkboxSelect.css';
import { Check, ChevronDown, Search, X } from 'lucide-react';

// Set globals for the plugin
(window as any).$ = $;
(window as any).jQuery = $;

export default function App() {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [pluginLoaded, setPluginLoaded] = useState(false);

  useEffect(() => {
    // Dynamically import the plugin to avoid hoisting issues
    import('./plugins/checkboxSelect.js').then(() => {
      setPluginLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (pluginLoaded && selectRef.current) {
      // Initialize the jQuery plugin
      const $select = $(selectRef.current);
      if (typeof ($select as any).checkboxSelect === 'function') {
        ($select as any).checkboxSelect({
          selectAllText: 'Selecionar Todos',
          deselectAllText: 'Desmarcar Todos',
          noResultsText: 'Nenhum resultado encontrado',
          selectedGroupText: 'Selecionados',
          availableGroupText: 'Não selecionados',
          titleText: 'Frutas Disponíveis',
          footerText: 'Selecionadas {selected} de {total}',
          noItemsSelectedText: 'Nenhuma fruta selecionada',
          onSelect: (values: string[]) => {
            setSelectedValues(values || []);
          }
        });
      }
    }
  }, [pluginLoaded]);

  const options = [
    { value: 'apple', label: 'Maçã' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cereja' },
    { value: 'date', label: 'Tâmara' },
    { value: 'elderberry', label: 'Amora-preta' },
    { value: 'fig', label: 'Figo' },
    { value: 'grape', label: 'Uva' },
    { value: 'honeydew', label: 'Melão' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            jQuery Checkbox Select
          </h1>
          <p className="text-slate-500 text-sm">
            Um plugin moderno de seleção múltipla com checkboxes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <label htmlFor="fruit-select" className="block text-sm font-semibold text-slate-700 mb-4">
            Escolha suas frutas favoritas
          </label>
          
          {/* The original select that will be transformed into a static list */}
          <select 
            id="fruit-select"
            ref={selectRef} 
            multiple 
            className="w-full"
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-3">
              Configuração do Plugin (Exemplo)
            </h3>
            <pre className="text-[10px] bg-slate-50 p-3 rounded-lg overflow-x-auto text-slate-600 border border-slate-100">
{`$select.checkboxSelect({
  titleText: 'Frutas Disponíveis',
  footerText: 'Selecionadas {selected} de {total}',
  noItemsSelectedText: 'Nenhuma fruta selecionada'
});`}
            </pre>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <h4 className="text-sm font-bold text-blue-900 mb-1">Como funciona?</h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              Este componente utiliza um plugin jQuery customizado que transforma um elemento <code>&lt;select multiple&gt;</code> padrão em uma interface moderna com busca, seleção em massa e checkboxes estilizados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
