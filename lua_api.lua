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
