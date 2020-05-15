CurrentEditMode = 1
InEditMode = false
CurrentEditedObject = nil

function OnPackageStart()
    CreateTimer(function()
        for _,object in pairs(GetStreamedObjects(false)) do
            if GetObjectPropertyValue(object, "harvestable") == 1 then
                ShowHarvestObject(object)
            end

            if GetObjectPropertyValue(object, "no_collision") ~= nil then
                SetObjectCollision(object)
            end

            if GetObjectPropertyValue(object, "editable") ~= nil then
                SetEditableObject(object)
            end

            if GetObjectPropertyValue(object, "canBeWear") == 1 then
                ShowWearableObject(object)
            end
        end
    end, 1000) 
end
AddEvent("OnPackageStart", OnPackageStart)

AddEvent("OnObjectStreamOut", function(object)
    -- Disable edition
    if CurrentEditedObject ~= nil then
        if InEditMode then
            SetObjectEditable(CurrentEditedObject, 0)
            SetInputMode(0)
            ShowMouseCursor(false)
            IsMouseCursorEnabled(false)
            InEditMode = false
            CurrentEditedObject = nil
        end
    end
end)

function ShowHarvestObject(object)
    local x,y,z = GetPlayerLocation(GetPlayerId())
    local x2,y2,z2 = GetObjectLocation(object)
    
    if GetDistance3D(x, y, z, x2, y2, z2) <= GetObjectPropertyValue(object, "harvestableInteractDistance") then
        SetObjectOutline(object, true)
    else
        SetObjectOutline(object, false)
    end
end

function ShowWearableObject(object) 
    local x,y,z = GetPlayerLocation(GetPlayerId())
    local x2,y2,z2 = GetObjectLocation(object)
    
    if GetDistance3D(x, y, z, x2, y2, z2) <= 150 then
        SetObjectOutline(object, true)
    else
        SetObjectOutline(object, false)
    end
end

function GetNearbyWearableObject()
    local x,y,z = GetPlayerLocation(GetPlayerId())
    n = nil
    nD = 9999999
    for _,o in pairs(GetStreamedObjects()) do
        if GetObjectPropertyValue(o, "canBeWear") == 1 then
            local x2, y2, z2 = GetObjectLocation(o)
            if GetDistance3D(x,y,z,x2,y2,z2) <= 150 then
                if n == nil then
                    n = o
                    nD = GetDistance3D(x,y,z,x2,y2,z2)
                elseif(nD > GetDistance3D(x,y,z,x2,y2,z2)) then
                    n = o
                    nD = GetDistance3D(x,y,z,x2,y2,z2)
                end
            end
        end
    end
    return n
end

function GetNearbyJobToolObject()
    local x,y,z = GetPlayerLocation(GetPlayerId())
    n = nil
    nD = 9999999
    for _,o in pairs(GetStreamedObjects()) do
        if GetObjectPropertyValue(o, "isJobTool") == 1 then
            local x2, y2, z2 = GetObjectLocation(o)
            if GetDistance3D(x,y,z,x2,y2,z2) <= 250 then
                if n == nil then
                    n = o
                    nD = GetDistance3D(x,y,z,x2,y2,z2)
                elseif(nD > GetDistance3D(x,y,z,x2,y2,z2)) then
                    n = o
                    nD = GetDistance3D(x,y,z,x2,y2,z2)
                end
            end
        end
    end
    return n
end

function SetEditableObject(object)
    local x,y,z = GetPlayerLocation(GetPlayerId())
    local x2, y2, z2 = GetObjectLocation(object)
    if GetObjectPropertyValue(object, "editable_by") ~= GetPlayerId() then
        local ObjectActor = GetObjectActor(object)
		ObjectActor:SetActorHiddenInGame(true)
        return
    else
        local ObjectActor = GetObjectActor(object)
		ObjectActor:SetActorHiddenInGame(false)
    end

    if GetObjectPropertyValue(object, "editable") == 1 and GetDistance3D(x,y,z,x2,y2,z2) < 800 then
        if CurrentEditedObject ~= nil then
            return
        end
        if not InEditMode then
            CallRemoteEvent("Object:EditPlacement", GetObjectPropertyValue(object, "uuid"))
            SetObjectEditable(object, CurrentEditMode)
            InEditMode = true
            CurrentEditedObject = object
            SetInputMode(1)
            ShowMouseCursor(true)
            IsMouseCursorEnabled(true)
            SetObjectOutline(object, true)
        end
    else
        if InEditMode then
            CallRemoteEvent("Object:EditPlacementCancel")
            SetObjectEditable(object, 0)
            SetObjectOutline(object, false)
            SetInputMode(0)
            ShowMouseCursor(false)
            IsMouseCursorEnabled(false)
            InEditMode = false
            CurrentEditedObject = nil
        end
    end
end

function SetObjectCollision(object)
    local ObjectActor = GetObjectActor(object)
    if GetObjectPropertyValue(object, "no_collision") == 1 then
		ObjectActor:SetActorEnableCollision(false)
    else
		ObjectActor:SetActorEnableCollision(true)
    end
end

function SubmitEditableObjectPlacement()
    if CurrentEditedObject == nil then
        return
    end
    local x, y, z = GetObjectLocation(CurrentEditedObject)
    local rx, ry, rz = GetObjectRotation(CurrentEditedObject)
    CallRemoteEvent("Object:EditPlacementDone", x,y,z,rx,ry,rz)
end

AddEvent("OnKeyPress", function(key)
    -- Lock toogle vehicle
    if(key == "E" and GetNearbyWearableObject() ~= nil) then
        CallRemoteEvent("Job:WearObject", GetObjectPropertyValue(GetNearbyWearableObject(), "uuid"))
    elseif(key == "E" and GetNearbyJobToolObject() ~= nil) then
        CallRemoteEvent("Object:Interact")
        CallRemoteEvent("Job:UseJobTool", GetObjectPropertyValue(GetNearbyJobToolObject(), "uuid"))
    elseif key == "E" and GetNearbyWearableObject() == nil then
        CallRemoteEvent("Object:Interact")
    end

    -- Rotate or Move
    if key == "O" then
        if InEditMode and CurrentEditedObject ~= nil then
            if CurrentEditMode == 1 then 
                CurrentEditMode = 2
            else
                CurrentEditMode = 1
            end
            SetObjectEditable(CurrentEditedObject, CurrentEditMode)
        end
    end

    -- Validate placement
    if key == "V" then
        if InEditMode and CurrentEditedObject ~= nil then
            SubmitEditableObjectPlacement()
        end
    end
end)