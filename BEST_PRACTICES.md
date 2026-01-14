# Best Practices for Resource Planner

Ten plik zawiera wytyczne i dobre praktyki, których należy przestrzegać podczas pracy nad projektem Resource Planner. Agent AI powinien się do nich stosować, aby unikać powtarzających się błędów i zapewnić wysoką jakość kodu oraz UX.

## Ogólne zasady
- Stosuj czytelne nazwy zmiennych, funkcji i komponentów.
- Komentuj złożoną logikę, ale nie nadmiarowo.
- Unikaj duplikacji kodu – stosuj komponenty wielokrotnego użytku.
- Przestrzegaj zasad DRY (Don't Repeat Yourself) i KISS (Keep It Simple, Stupid).
- Używaj typowania (TypeScript) i waliduj dane wejściowe.

## UI/UX
- Zapewnij spójny, estetyczny interfejs.
- Stosuj intuicyjne nazwy i opisy w UI.
- Zadbaj o dostępność (ARIA, kontrast, czytelność).
- Unikaj nadmiaru informacji na ekranie – grupuj logicznie widoki.
- Dodawaj podpowiedzi i komunikaty błędów tam, gdzie to potrzebne.

## Logika aplikacji
- Filtrowanie i łączenie zasobów powinno być szybkie i czytelne dla użytkownika.
- Waliduj zestawy przed dodaniem – nie pozwalaj na niepoprawne kombinacje.
- Koszty powinny być zawsze aktualne i widoczne w panelu bocznym.
- Automatyczne generowanie zestawów musi uwzględniać wszystkie reguły kompatybilności.

## Kod
- Dziel kod na małe, czytelne komponenty/funkcje.
- Stosuj testy jednostkowe dla kluczowej logiki (jeśli to możliwe).
- Unikaj hardkodowania wartości – stosuj stałe lub konfiguracje.
- Dokumentuj publiczne API komponentów i funkcji.

## Współpraca z agentem AI
- Zawsze odnoś się do wymagań z README.md i schematu z SCHEMA.md.
- Jeśli pojawi się błąd, zapisz go w tym pliku wraz z rozwiązaniem.
- Aktualizuj ten plik, gdy pojawią się nowe dobre praktyki lub typowe błędy.

---
Ten plik jest punktem odniesienia dla wszystkich prac nad projektem. Agent AI powinien go regularnie sprawdzać i stosować się do zawartych tu zasad.