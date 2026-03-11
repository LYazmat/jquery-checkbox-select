/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import './plugins/checkboxSelect.js';
import './plugins/checkboxSelect.css';
import { Check, ChevronDown, Search, X } from 'lucide-react';

export default function App() {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    if (selectRef.current) {
      // Initialize the jQuery plugin
      const $select = $(selectRef.current);
      ($select as any).checkboxSelect({
        placeholder: 'Selecione as opções...',
        selectAllText: 'Selecionar Todos',
        deselectAllText: 'Desmarcar Todos',
        noResultsText: 'Nenhum resultado encontrado',
        onSelect: (values: string[]) => {
          setSelectedValues(values || []);
        }
      });
    }
  }, []);

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
          <label className="block text-sm font-semibold text-slate-700 mb-4">
            Escolha suas frutas favoritas
          </label>
          
          {/* The original select that will be transformed into a static list */}
          <select 
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

          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-3">
              Itens Selecionados ({selectedValues.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedValues.length > 0 ? (
                selectedValues.map(val => {
                  const label = options.find(o => o.value === val)?.label;
                  return (
                    <span 
                      key={val} 
                      className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 animate-in fade-in zoom-in duration-200"
                    >
                      {label}
                    </span>
                  );
                })
              ) : (
                <span className="text-sm text-slate-400 italic">Nenhum item selecionado</span>
              )}
            </div>
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
