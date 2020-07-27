local java = ImportPackage("java");

AddFunctionExport("GetAdminLevel", function(player)
    return java.GetAdminLevel(player)
end)

AddFunctionExport("GetAccount", function(player)
    local account = java.GetAccount(player)
    if(account == nil) then
        return nil
    end
    return jsondecode(account)
end)

AddFunctionExport("AddAmbiantSound", function(name, fileName, x,y,z, radius, volume)
    java.AddAmbiantSound(name, fileName, x,y,z, radius, volume)
end)

AddFunctionExport("SendToast", function(player, type, text)
    java.SendToast(player, type, text)
end)

AddFunctionExport("AddItem", function(player, itemId, quantity)
    return java.AddItem(player, itemId, quantity)
end)

AddFunctionExport("AddRestrictedZone", function(jobId, sx, sy, sz, ex, ey, ez)
    return java.AddRestrictedZone(jobId, sx, sy, sz, ex, ey, ez)
end)

AddFunctionExport("AddI18nKey", function(lang, key, value)
    return java.AddI18nKey(lang, key, value)
end)

AddFunctionExport("GetI18nForPlayer", function(player, key, param1, param2)
    if param1 == nil then
        param1 = ""
    end
    if param2 == nil then
        param2 = ""
    end
    return java.GetI18nForPlayer(player, key, param1, param2)
end)

--------
-- Job API
--------

AddFunctionExport("CreateJob", function(jobId, refillInterval)
    return java.CreateJob(jobId, refillInterval)
end)

AddFunctionExport("AddJobLevel", function(jobId, name, level, exp)
    return java.AddJobLevel(jobId, name, level, exp)
end)

AddFunctionExport("AddJobResource", function(jobId, name, exp, harvestTime, levelRequired, modelId, distanceToInteract)
    return java.AddJobResource(jobId, name, exp, harvestTime, levelRequired, modelId, distanceToInteract)
end)

AddFunctionExport("AddItemResourceRequirement", function(jobId, resourceId, itemId)
    return java.AddJobLevel(jobId, resourceId, itemId)
end)

AddFunctionExport("SetHarvestAnimation", function(jobId, resourceId, animation, loopInterval, loopAmount, loopSound)
    return java.SetHarvestAnimation(jobId, resourceId, animation, loopInterval, loopAmount, loopSound)
end)

--------
-- Item API
--------

AddFunctionExport("CreateItemTemplate", function(id, name, desc, weight, picture, modelId, modelScale, foodValue, drinkValue, weaponId, ammoPerRecharge, maskId)
    return java.CreateItemTemplate(id, name, desc, weight, picture, modelId, modelScale, foodValue, drinkValue, weaponId, ammoPerRecharge, maskId)
end)

--------
-- Generic Menu API
--------

AddFunctionExport("CreateMenu", function(player)
    return java.CreateMenu(player)
end)

AddFunctionExport("AddMenuItem", function(menuId, text, action)
    return java.AddMenuItem(menuId, text, action)
end)

AddFunctionExport("ShowMenu", function(menuId)
    return java.ShowMenu(menuId)
end)

--------
-- Map API
--------

AddFunctionExport("AddMapMarker", function(type, icon, x, y)
    return java.AddMapMarker(type, icon, x, y)
end)

AddFunctionExport("RemoveMapMarker", function(id)
    return java.RemoveMapMarker(id)
end)