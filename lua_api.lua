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
