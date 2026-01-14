## Schemat bazy danych (model danych)

### Podstawowe tabele

**Machines**
- id
- name
- icon
- purchaseCost
- monthlyCost

**Devices**
- id
- name
- icon
- purchaseCost
- monthlyCost

**People**
- id
- name
- icon
- hireCost
- monthlyCost

### Tabele relacyjne (kluczowe)

Kompatybilność urządzeń z maszynami

**MachineDevices**
- machineId
- deviceId

Umiejętności ludzi (skille)

**Skills**
- personId
- resourceType  // 'machine' | 'device'
- resourceId

_Skill = „ten człowiek potrafi obsługiwać TEN zasób”_